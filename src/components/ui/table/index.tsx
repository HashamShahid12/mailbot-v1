import { Flex, Table, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { ListAndSegmentExpandedRow } from "@/components/ui/audiance/list-and-segment/list-and-segment-expanded-row.tsx";
import { TablePaginationFooter } from "./pagination-footer.tsx";
import { ListAndSegmentName } from "@/components/ui/audiance/list-and-segment/list-and-segment-name.tsx";
import { TableName } from "./table-name.tsx";
import { TableStatus } from "./table-status.tsx";
import { TableType } from "./table-type.tsx";
import TableActiveSite from "./table-active-site.tsx";
import { TablePercentChange } from "./table-percent-change.tsx";
import PagePerRow from "./page-per-row.tsx";
import SkeletonLoader from "../skeletons/index.tsx";
import type { TablesProps } from "@/types/table-props.ts";
import type { ListAndSegmentType } from "@/types/user-type.ts";
import TableImage from "./table-image.tsx";

const Tables: React.FC<TablesProps> = ({
  columns,
  rows,
  heading,
  headerPadding,
  headerPaddingBlock,
  rowpadding,
  pagePerRow,
  pagination,
  cellPadding,
  defaultPageSize = 10,
  expandedRows = [],
  loading,
}) => {
  // console.log(rows, "rowsssss");
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  // Calculate paginated data
  const totalPages = Math.ceil(rows.length / pageSize);
  const paginatedRows = rows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const goToPrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <>
      {heading && (
        <Text fontSize="xl" fontWeight="bold" mb="4">
          {heading}
        </Text>
      )}
      <SkeletonLoader
        showAvatar={false}
        boxHeight={0}
        lineCount={3}
        w="full"
        h="8xs"
        loading={loading}
      >
        <Table.Root variant="line" interactive marginTop="6">
          <Table.Header>
            <Table.Row>
              {columns.map((col, idx) => (
                <Table.ColumnHeader
                  key={idx}
                  color="gray.400"
                  fontWeight="normal"
                  textAlign={col.isNumeric ? "end" : "start"}
                  width={col.width || "auto"}
                  py={headerPaddingBlock || "2"}
                  px={headerPadding || "5"}
                  _dark={{ color: "gray.500" }}
                >
                  {col.header}
                  {col.icon && col.icon}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body fontSize="sm" _hover={{ bg: "gray.200" }}>
            {paginatedRows.map((row, rowIdx) => (
              <React.Fragment key={`row-${row.id || rowIdx}`}>
                <Table.Row>
                  {columns.map((col, colIdx) => (
                    <Table.Cell
                      key={`cell-${row.id || rowIdx}-${col.key || colIdx}`}
                      textAlign={col.isNumeric ? "end" : "start"}
                      width={col.width || "auto"}
                      py={rowpadding || "2"}
                      cursor="button"
                      px={cellPadding || "5"}
                    >
                      {(() => {
                        // CUSTOM CELL RENDER (PRIORITY)
                        if (col.cell) {
                          return col.cell(row);
                        }

                        // FLOW COLUMN WITH LINK
                        if (col.key === "name") {
                          return <TableName row={row} col={col} />;
                        }

                        // LISTANDSEGMENT COLUMN WITH LINK
                        if (col.key === "listandsegmentname") {
                          return <ListAndSegmentName row={row} col={col} />;
                        }

                        // STATUS COLUMN WITH ICON
                        if (col.key === "status") {
                          return <TableStatus status={row.status} />;
                        }

                        // TYPE COLUMN WITH ICON
                        if (col.key === "type") {
                          return <TableType type={row[col.key]} />;
                        }

                        // ACTIVE ON SITE COLUMN WITH SUBTITLE
                        if (col.key === "activesite") {
                          return (
                            <TableActiveSite
                              value={row[col.key]}
                              subtitle={row.subtitleActiveOnSite}
                            />
                          );
                        }

                        // PERCENTCHANGE COLUMN WITH ICON
                        if (col.key === "percentchange") {
                          return <TablePercentChange value={row[col.key]} />;
                        }

                        if (col.key === "template_image") {
                          return <TableImage image={row[col.key]} />;
                        }

                        // DEFAULT CELL RENDER
                        return row[col.key];
                      })()}
                    </Table.Cell>
                  ))}
                </Table.Row>
                {expandedRows.includes(row.id) && (
                  <ListAndSegmentExpandedRow
                    key={`expanded-${row.id}`}
                    colSpan={columns.length}
                    listandsegment={row as ListAndSegmentType}
                  />
                )}
              </React.Fragment>
            ))}
          </Table.Body>
        </Table.Root>
        {/* // Pagination Controls */}
        <Flex
          justifyContent={
            pagePerRow && pagination ? "space-between" : "flex-end"
          }
        >
          {pagePerRow && (
            <PagePerRow
              pageSize={pageSize}
              setPageSize={setPageSize}
              setCurrentPage={setCurrentPage}
            />
          )}
          {pagination && (
            <TablePaginationFooter
              currentPage={currentPage}
              totalPages={totalPages}
              goToPrevious={goToPrevious}
              goToNext={goToNext}
            />
          )}
        </Flex>
      </SkeletonLoader>
    </>
  );
};

export default Tables;
