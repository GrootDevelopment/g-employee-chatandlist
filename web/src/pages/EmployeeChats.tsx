import {
  ActionIcon,
  Group,
  rgba,
  ScrollArea,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { FC, useEffect, useRef, useState } from "react";
import UseLocalization from "../context/UseLocalization";
import { employeeChatProps } from "../@types/AllTypes.t";
import SendBtnIcon from "../icons/SendBtnIcon";
import { useForm } from "@mantine/form";
import useGlobal from "../context/useGlobal";
import { fetchNui } from "../utils/fetchNui";

const EmployeeChat: FC = () => {
  const theme = useMantineTheme();
  const locals = UseLocalization();
  const global = useGlobal();

  const [Messages, setMessages] = useState<employeeChatProps[]>(
    global.Messages
  );
  const form = useForm({
    initialValues: {
      message: "",
    },
    validate: {
      message: (value) => (value.length > 0 ? null : ""),
    },
  });

  const [myinformation] = useState<{ name: string; job: string }>({
    name: global.myName,
    job: global.myJob,
  });

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const scrollAreaHeight = 610;

  const [lastMessageTime, setLastMessageTime] = useState<number>(0);
  const messageCooldown = 2000;

  useEffect(() => {
    if (global.Messages.length !== Messages.length) {
      setMessages(global.Messages);
    }
  }, [global.Messages, Messages]);

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (scrollArea && lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView();
    }
  }, [Messages]);

  const handleMessage = () => {
    const currentTime = Date.now();

    if (
      form.values.message.trim() === "" ||
      currentTime - lastMessageTime < messageCooldown
    ) {
      return;
    }

    const newMessage = {
      sender: myinformation.name,
      message: form.values.message.trim(),
      job: myinformation.job,
    };

    fetchNui("justgroot:g-employeeslistandchat:get-chat-data", newMessage);

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    form.reset();
    setLastMessageTime(currentTime);
  };
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <Group
      className="w-[400px] h-mainheights p-3 rounded"
      display={"flow"}
      style={{
        backgroundColor: rgba(theme.other.color_secondary, 78 / 100),
      }}
    >
      <ScrollArea
        ref={scrollAreaRef}
        h={scrollAreaHeight}
        mt={"10px"}
        display={"flow"}
        type="scroll"
        scrollbarSize={6}
        w={"100%"}
      >
        {Messages.length === 0 && (
          <Group display={"flex"} className="w-full">
            <Text>{locals.employeeschatempty}</Text>
          </Group>
        )}
        {Messages.map((msg, index) => (
          <div
            key={index}
            ref={index === Messages.length - 1 ? lastMessageRef : null}
          >
            <div className="w-full flex items-center gap-x-2 mt-0.5 ">
              <span className="text-sm font-semibold ">
                {time} <span>{msg.sender}</span>
              </span>
              <p>{msg.message}</p>
            </div>
          </div>
        ))}
      </ScrollArea>
      <form
        className="flex w-full items-center gap-x-2 font-rubik"
        onSubmit={form.onSubmit(() => {
          handleMessage();
        })}
      >
        <TextInput
          placeholder={locals.chatinputplaceholder}
          size="sm"
          w={"100%"}
          className="font-kanit"
          {...form.getInputProps("message")}
          styles={{
            input: {
              backgroundColor: theme.other.color_secondary,
              color: theme.other.color_white,
            },
          }}
        />
        <ActionIcon
          size="input-sm"
          variant="filled"
          styles={{
            root: { backgroundColor: theme.other.color_success },
          }}
          type="submit"
        >
          <SendBtnIcon />
        </ActionIcon>
      </form>
    </Group>
  );
};

export default EmployeeChat;
