import React, { FC, useEffect, useState } from "react";
import "../index.css";
import { debugData } from "../utils/debugData";
import {
  Group,
  rgba,
  ScrollArea,
  Table,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";

import UseLocalization from "../context/UseLocalization";
import { exployeeListsProps } from "../@types/AllTypes.t";
import Heading from "../components/Heading";
import { motion } from "framer-motion";

debugData([
  {
    action: "setVisible",
    data: true,
  },
]);
import greendot from "../../img/greendot.svg";
import reddot from "../../img/reddot.svg";
import useGlobal from "../context/useGlobal";

const EmployeeLists: FC = () => {
  const theme = useMantineTheme();
  const locals = UseLocalization();
  const global = useGlobal();

  const [employeeLists, setEmployeeLists] = useState<exployeeListsProps[]>(
    global.employeeLists
  );



  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
      },
    }),
  };

  useEffect(() => {
    setEmployeeLists(global.employeeLists);
  }, [global.employeeLists]);

  const getActiveEmployees = employeeLists.sort((a, b) => {
    return a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1;
  });

  const rows = getActiveEmployees.map((element: exployeeListsProps, i) => (
    <motion.tr
      key={element.name}
      custom={i}
      initial="hidden"
      animate="visible"
      variants={rowVariants}
    >
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.rank}</Table.Td>
      <Tooltip
        label={element.isActive ? locals.online : locals.offline}
        transitionProps={{
          transition: "slide-right",
        }}
        arrowPosition="side"
        styles={{
          tooltip: {
            backgroundColor: rgba(theme.other.color_primary, 78 / 100),
            color: theme.other.color_white,
          },
        }}
      >
        <Table.Td>
          {element.isActive ? (
            <img src={greendot} alt="online" width={12} />
          ) : (
            <img src={reddot} alt="offline" width={7} />
          )}
        </Table.Td>
      </Tooltip>
    </motion.tr>
  ));

  return (
    <Group
      className="  w-[400px] h-mainheights  p-3 rounded"
      display={"flow-root"}
      style={{
        backgroundColor: rgba(theme.other.color_secondary, 78 / 100),
        alignItems: "start",
      }}
    >
      <Heading title={locals.employeelistTitle} />
      <ScrollArea style={{ height: "630px" }} scrollbarSize={2} mt={"10px"}>
        <Table
          stickyHeader
          
          
          styles={{
            caption: {
              backgroundColor: rgba(theme.other.color_secondary, 99 / 100),
            },
            table: {
              ":hover": {
                backgroundColor: `${rgba(
                  theme.other.color_primary,
                  99 / 100
                )} !important`,
              },
            },
          }}
          className="font-rubik"
        >
          <Table.Thead
            styles={{
              thead: {
                backgroundColor: rgba(theme.other.color_secondary, 78 / 100),
              },
            }}
          >
            <Table.Tr>
              <Table.Th>{locals.Name}</Table.Th>
              <Table.Th>{locals.Rank}</Table.Th>
              <Table.Th>{locals.Status}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows.length > 0 ? rows : <Table.Td>{locals.noemployeesfound}</Table.Td>}</Table.Tbody>
        </Table>
      </ScrollArea>
    </Group>
  );
};

export default EmployeeLists;
