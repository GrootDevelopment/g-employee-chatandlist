import {
  Badge,
  Group,
  rgba,
  Title,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { FC } from "react";
import UseLocalization from "../context/UseLocalization";
import useGlobal from "../context/useGlobal";

interface HeadingProps {
  title: string;
}

const Heading: FC<HeadingProps> = (props) => {
  const { title } = props;
  const theme = useMantineTheme();
  const locals = UseLocalization();
  const global = useGlobal();
  return (
    <>
      <Group display={"flex"} justify="space-between" w={"100%"}>
        <Title order={5} className="font-rubik tracking-wider">
          {title}
        </Title>
        <Tooltip
          label={locals.onlineAndTotalEmployees}
          withArrow
          transitionProps={{
            transition: "slide-up",
          }}
          arrowPosition="center"
          styles={{
            tooltip: {
              backgroundColor: rgba(theme.other.color_primary, 78 / 100),
              color: theme.other.color_white,
            },
          }}
        >
          <Badge
            className="font-mukta tracking-wider"
            styles={{
              root: {
                backgroundColor: rgba(theme.other.color_primary, 78 / 100),
                color: theme.other.color_text,
                borderColor: theme.other.color_primary,
              },
            }}
            radius={"xs"}
          >
            {global.TotalOnlineEmployee}/{global.TotalEmployees}
          </Badge>
        </Tooltip>
      </Group>
    </>
  );
};

export default Heading;
