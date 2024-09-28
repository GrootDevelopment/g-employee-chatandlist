import { FC } from "react";
import Navbar from "../components/Navbar";
import Router from "../providers/Router";
import { Container } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";

const Layouts: FC = () => {

  return (
    <>
      <AnimatePresence>
          <Container
            fluid
            style={{
              justifyContent: "end",
              display: "flex",
              height: "100vh",
              alignItems: "center",
              gap: "1rem",
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: 50 }} 
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50, transition: { duration: 0.9} }}
              transition={{ duration: 0.3 }}
              className="flex gap-x-3"
            >
              <Navbar />
              <div>
                <Router />
              </div>
            </motion.div>
          </Container>
      </AnimatePresence>
    </>
  );
};

export default Layouts;
