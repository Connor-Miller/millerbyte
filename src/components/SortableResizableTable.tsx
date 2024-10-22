import React, { useMemo, useState, useCallback } from 'react'
import { useTable, useSortBy, Column, useBlockLayout, useResizeColumns } from 'react-table'
import { ChevronDown, ChevronUp, ArrowUpDown, Edit, Save } from 'lucide-react'
import AddRowModal from './AddRowModal' // Import the modal component

type ColumnType = 'number' | 'string' | 'date' | 'boolean'

interface TableColumn {
  Header: string
  accessor: string
  type: ColumnType
}

interface TableProps {
  columns?: TableColumn[]
  data?: any[]
  onSaveChanges?: (rowIndex: number, columnId: string, value: any) => void
  onAddRow?: (e: React.MouseEvent<HTMLButtonElement>) => void
  title?: string
}

// Function to format dates
const formatDate = (date: any) => {
    if (!date) return ''; // Handle null or undefined dates
    return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(date));
};

export default function SortableResizableTable({ columns = [], data = [], onSaveChanges, onAddRow, title }: TableProps) {
  const [editMode, setEditMode] = useState(false)
  const [editedCell, setEditedCell] = useState<{ rowIndex: number; columnId: string; value: any } | null>(null)
  const [tableData, setTableData] = useState(data)
  //const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  // Update defaultColumn to format booleans and dates
  const defaultColumn = useMemo(
    () => ({
      minWidth: 100,
      width: 150,
      maxWidth: 400,
      Cell: ({ cell: { value }, row: { index }, column: { id } }: any) => {
        const [cellValue, setCellValue] = useState(value)

        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setCellValue(e.target.value)
        }

        const onBlur = () => {
          if (cellValue !== value) {
            onSaveChanges?.(index, id, cellValue)
            setEditedCell({ rowIndex: index, columnId: id, value: cellValue })
            setTableData(prevData => {
              const newData = [...prevData]
              newData[index] = { ...newData[index], [id]: cellValue }
              return newData
            })
          }
        }

        // Check the type of value and render accordingly
        if (typeof value === 'boolean') {
          return <div>{value ? 'Yes' : 'No'}</div>; // Display boolean as Yes/No
        } else if (value instanceof Date || !isNaN(Date.parse(value))) {
          return <div>{formatDate(value)}</div>; // Format date
        }

        // If in edit mode, show input
        if (editMode) {
          return (
            <input
              value={cellValue}
              onChange={onChange}
              onBlur={onBlur}
              className="w-full bg-gray-700 text-gray-300 px-2 py-1 rounded"
            />
          )
        }

        // Default display for other types
        return <div>{cellValue !== undefined ? cellValue : ''}</div>
      },
    }),
    [editMode, onSaveChanges]
  )

  // Custom sort functions
  const dateSort = (rowA: any, rowB: any, columnId: string) => {
    const dateA = new Date(rowA.values[columnId]);
    const dateB = new Date(rowB.values[columnId]);
    return dateA.getTime() - dateB.getTime(); // Sort by date
  };

  const numberSort = (rowA: any, rowB: any, columnId: string) => {
    const numA = rowA.values[columnId];
    const numB = rowB.values[columnId];
    return numA - numB; // Sort by number
  };

  const booleanSort = (rowA: any, rowB: any, columnId: string) => {
    const a = rowA.values[columnId];
    const b = rowB.values[columnId];
    return (a === b) ? 0 : a ? -1 : 1; // Sort true values before false
  };

  const stringSort = (rowA: any, rowB: any, columnId: string) => {
    const strA = rowA.values[columnId];
    const strB = rowB.values[columnId];
    // Handle null values
    if (strA === undefined && strB === undefined) return 0; // Both are null, considered equal
    if (strA === undefined) return 1; // Nulls are considered greater than any string
    if (strB === undefined) return -1; // Any string is considered less than null

    return strA.toString().localeCompare(strB.toString()); // Sort by string
  };

  // Update memoizedColumns to use custom sort functions
  const memoizedColumns = useMemo<Column[]>(
    () =>
      columns.map((col) => ({
        ...col,
        ...defaultColumn,
        // Use custom sort functions for boolean, date, and number types
        sortType: col.type === 'boolean' ? booleanSort :
                   col.type === 'date' ? dateSort :
                   col.type === 'number' ? numberSort :
                   stringSort, // Default to string sort
      })),
    [columns]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns: memoizedColumns,
      data: tableData,
      defaultColumn,
    },
    useBlockLayout,
    useResizeColumns,
    useSortBy
  )

  const toggleEditMode = useCallback(() => {
    setEditMode((prev) => !prev)
  }, [])

  const addNewRow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onAddRow?.(e);
  };



  return (
    <div className="p-4 bg-gray-900">
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="flex justify-between items-center px-6 py-3 bg-gray-700">
            <h2 className="text-lg font-semibold text-gray-300">{title}</h2>
            <div className="flex space-x-2">
              <button
                onClick={toggleEditMode}
                className={`px-4 py-2 rounded-md flex items-center ${
                  editMode ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
                } transition-colors duration-200`}
              >
                {editMode ? (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </>
                )}
              </button>
              <button
                onClick={(e) => onAddRow?.(e)} // Open the modal
                className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-700 transition-colors duration-200"
              >
                Add Row
              </button>
            </div>
          </div>
          <table {...getTableProps()} className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              {headerGroups.map((headerGroup, i) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                  {headerGroup.headers.map((column: any, j) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="group px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider relative cursor-pointer hover:bg-gray-600 transition-colors duration-200"
                      key={j}
                    >
                      <div className="flex items-center justify-between">
                        {column.render('Header')}
                        <span className="ml-2">
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronUp className="h-4 w-4" />
                            )
                          ) : (
                            <ArrowUpDown className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                          )}
                        </span>
                      </div>
                      <div
                        {...column.getResizerProps()}
                        className={`resizer ${
                          column.isResizing ? 'isResizing' : ''
                        }`}
                        style={{
                          position: 'absolute',
                          right: 0,
                          top: 0,
                          height: '100%',
                          width: '5px',
                          background: column.isResizing ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                          cursor: 'col-resize',
                          userSelect: 'none',
                          touchAction: 'none',
                        }}
                      />
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="bg-gray-800 divide-y divide-gray-700">
              {rows.map((row, i) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()} key={i} className="hover:bg-gray-700 transition-colors duration-200">
                    {row.cells.map((cell, j) => {
                      const [value, setValue] = useState(cell.value)

                      return (
                        <td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300" key={j}>
                          {editMode ? (
                            <input
                              type="text"
                              value={value}
                              onChange={(e) => setValue(e.target.value)}
                              onBlur={() => {
                                if (value !== cell.value) {
                                  cell.row.values[cell.column.id] = value
                                  saveChanges(cell.row, cell.column.id, value)
                                }
                              }}
                              className="bg-gray-800 text-gray-300 border border-gray-600 rounded p-1"
                            />
                          ) : (
                            <div>{cell.value}</div>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* <AddRowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close the modal
        onAddRow={addNewRow}
        columns={columns}
      /> */}
    </div>
  )
}

const saveChanges = (row: any, columnId: string, value: any) => {
  console.log(row, columnId, value)
  // Placeholder for save changes logic
}
