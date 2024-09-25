import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

import useApi from "../lib/hooks/useApi";
import urlConstants from "../lib/constants/url.constants";
import { ApiCommand } from "../lib/Api";
import Select from "../components/common/select";
import Table from "../components/common/Table";
import { DOGS_TABLE_HEADER } from "../lib/constants/dogs.constants";
import { SelectOption } from "../components/common/select/Select";
import {
  selectOptionsMapper,
  selectOptionToString,
} from "../lib/utils/home.util";
import Input, { InputType } from "../components/common/Input";
import { useFavorites } from "../lib/contexts/FavoritesContext";
import Header from "../components/Header";
import Pagination from "../components/common/Pagination";

const {
  fetchBreeds: fetchBreedsUrl,
  searchDogs: searchDogsUrl,
  getDogs: getDogsUrl,
  getMatch: getMatchUrl,
} = urlConstants.dogs;

const { logout: logoutUrl } = urlConstants.auth;

const Home = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<SelectOption[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [minAge, setMinAge] = useState<number>();
  const [maxAge, setMaxAge] = useState<number>();
  const [sortFieldName, setSortFieldName] = useState<string>();
  const [matchedDog, setMatchedDog] = useState<Dog>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [nextUrl, setNextUrl] = useState<string>();
  const [prevUrl, setPrevUrl] = useState<string>();

  const { loading: isGetBreedsLoading, sendRequest: getBreeds } =
    useApi<string[]>();

  const { loading: isSearchDogsLoading, sendRequest: searchDogIds } =
    useApi<DogsSearch>();

  const { loading: isGetDogsLoading, sendRequest: getDogs } = useApi<Dog[]>();

  const { sendRequest: getMatch } = useApi<Match>();

  const { sendRequest: logout } = useApi();

  const { favoriteIds, setFavoriteIds } = useFavorites();

  useEffect(() => {
    getBreeds({
      callback: (data: string[] | null) => setBreeds(data ?? []),
      command: ApiCommand.GET,
      url: fetchBreedsUrl,
    });
    fetchDogs();
  }, []);

  const debouncedSearch = useRef(
    debounce(async (options) => {
      fetchDogs(options);
    }, 500)
  ).current;

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const searchDogs = (
    url: string,
    options?: Record<string, string | number | string[] | undefined>
  ) => {
    searchDogIds({
      callback: (data: DogsSearch | null) => {
        if (!data) return;
        const { resultIds, total } = data;
        setTotalCount(total);
        setPrevUrl(data?.prev);
        setNextUrl(data?.next);

        getDogs({
          callback: (data: Dog[] | null) => setDogs(data ?? []),
          command: ApiCommand.POST,
          options: resultIds,
          url: getDogsUrl,
        });
      },
      command: ApiCommand.GET,
      url: url,
      options,
    });
  };

  const fetchDogs = (
    options?: Record<string, string | number | string[] | undefined>
  ) => {
    searchDogs(searchDogsUrl, options);
  };

  const onFavorite = (id: string, value: boolean) => {
    setFavoriteIds(id, value);
  };

  const onMatch = () => {
    getMatch({
      callback: (data: Match | null) => {
        setMatchedDog(dogs.find((dog: Dog) => dog.id === data?.match));
      },
      command: ApiCommand.POST,
      options: favoriteIds,
      url: getMatchUrl,
    });
  };

  const onLogout = () => {
    logout({
      callback: () => {
        window.location.reload();
      },
      command: ApiCommand.POST,
      url: logoutUrl,
    });
  };

  const onPrevPage = () => {
    searchDogs(prevUrl  ?? '', {
      ageMin: minAge,
      ageMax: maxAge,
      breeds: selectOptionToString(selectedBreeds),
    });
    setPageNumber(prev => prev - 1)
  };

  const onNextPage = () => {
    searchDogs(nextUrl  ?? '', {
      ageMin: minAge,
      ageMax: maxAge,
      breeds: selectOptionToString(selectedBreeds),
    });
    setPageNumber(prev => prev + 1)
  };

  return (
    <div style={{ padding: "50px" }}>
      <Header onLogout={onLogout} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Input
          label="Min age"
          type={InputType.NUMBER}
          value={minAge}
          onChange={(val) => {
            setMinAge(parseFloat(val as string));
            debouncedSearch({
              ageMin: val,
              ageMax: maxAge,
              breeds: selectOptionToString(selectedBreeds),
            });
          }}
        />
        <Input
          label="Max age"
          type={InputType.NUMBER}
          value={maxAge}
          onChange={(val) => {
            setMaxAge(parseFloat(val as string));
            debouncedSearch({
              ageMin: minAge,
              ageMax: val,
              breeds: selectOptionToString(selectedBreeds),
            });
          }}
        />
        <div style={{ minWidth: "300px" }}>
          <Select
            isLoading={isGetBreedsLoading}
            isMulti
            options={selectOptionsMapper(breeds)}
            onChange={(option) => {
              setSelectedBreeds(option);
              fetchDogs({
                ageMin: minAge,
                ageMax: maxAge,
                breeds: selectOptionToString(option),
              });
            }}
            value={selectedBreeds}
          />
        </div>
      </div>
      {isSearchDogsLoading || isGetDogsLoading ? (
        "Loading"
      ) : (
        <div>
          <Table
            headers={DOGS_TABLE_HEADER}
            data={dogs}
            favoriteIds={favoriteIds}
            onSort={(fieldName: string) => {
              fetchDogs({
                ageMin: minAge,
                ageMax: maxAge,
                breeds: selectOptionToString(selectedBreeds),
                sort: `${fieldName}:${
                  sortFieldName === fieldName ? "asc" : "desc"
                }`,
              });
              setSortFieldName(fieldName);
            }}
            onFavorite={onFavorite}
          />
          <Pagination
            pageNumber={pageNumber}
            isPrev={!!prevUrl}
            isNext={!!nextUrl}
            onPrev={onPrevPage}
            onNext={onNextPage}
          />

          <button onClick={onMatch}>Match</button>
          {JSON.stringify(matchedDog)}
        </div>
      )}
    </div>
  );
};

export default Home;
