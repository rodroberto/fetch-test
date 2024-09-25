import Input, { InputType } from "../Input";

interface TableProps {
  headers: Record<string, boolean>;
  data: Record<string, string | number | boolean>[];
  favoriteIds?: string[];
  onSort?: (fieldName: string) => void;
  onFavorite?: (id: string, isChecked: boolean) => void;
}

const Table = ({
  headers,
  data,
  favoriteIds,
  onSort,
  onFavorite,
}: TableProps) => {
  return (
    <table>
      <thead>
        {Object.entries(headers).map(([key, value]) => {
          return (
            <th
              key={key}
              style={{ cursor: value ? "pointer" : "unset" }}
              onClick={() => {
                if (value) onSort?.(key);
              }}
            >
              {key}
            </th>
          );
        })}
        <th>Favorites</th>
      </thead>
      <tbody>
        {data.map(
          (d: Record<string, string | number | boolean>, index: number) => {
            return (
              <tr key={index.toString()}>
                {Object.entries(d).map(([key, value]) => (
                  <td key={key}>{value}</td>
                ))}
                <td>
                  <Input
                    defaultChecked={favoriteIds?.some((id) => id === d.id)}
                    onChange={(val) =>
                      onFavorite?.(d.id as string, val as boolean)
                    }
                    type={InputType.CHECKBOX}
                  />
                </td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
};

export default Table;
