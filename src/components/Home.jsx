// import React from "react";
// import { Box, Image, Text } from "@chakra-ui/react";
// import btcScr from "../assets/btc.png";
// import {animate, motion} from "framer-motion";
// const Home = () => {
//   return (
//     <Box bgColor={"blackAlpha.900"} w-={"full"} h={"85vh"}>
//       <motion.div
//         style={{
//           height:"80vh",
//         }}
//         animate={{
//           translateY: "25px",
//         }}
//         transition={{
//           duration: 0.8,
//           repeat: Infinity,
//           repeatType: "reverse",
//         }}
      
//       >
//       <Image
//         w={"full"}
//         h={"full"}
//         objectFit={"contain"}
//         src={btcScr}
//         filter={"grayscale(1)"}
//       />
//       </motion.div>
//       <Text
//         fontSize={"6xl"}
//         textAlign={"center"}
//         fontWeight={"thin"}
//         color={"whiteAlpha.700"}
//         mt={"-2"}
//       >
//         Xcrypto
//       </Text>
//     </Box>
//   );
// };

// export default Home;
import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import btcScr from "../assets/btc.png";

// Motion-enabled Chakra UI Image component
const MotionImage = motion(Image);

const Home = () => {
  return (
    <Box 
      bgColor={"blackAlpha.900"} 
      w={"full"} 
      h={"85vh"} 
      overflow={"hidden"} // Prevent horizontal scrollbar
    >
      <motion.div
        style={{
          height: "70vh",
          width: "100%", // Ensure full width
        }}
        animate={{
          translateY: [0, 25, 0], // Up-down motion
          rotate: [0, 0, 360], // After up-down, rotate 360 degrees
        }}
        transition={{
          duration: 4, // Total duration for one full cycle (up-down + rotation)
          times: [0, 0.5, 1], // Timing to control when rotation happens
          repeat: Infinity, // Loop infinitely
          ease: "easeInOut", // Smooth transition for both movement and rotation
        }}
      >
        {/* Automatically changing grayscale to original */}
        <MotionImage
          id="image" // To reference the image for rotation
          w={"full"}
          h={"full"}
          objectFit={"contain"} // Contain the image within its boundaries
          src={btcScr}
          filter={"grayscale(1)"} // Default grayscale
          animate={{
            filter: ["grayscale(1)", "grayscale(0)", "grayscale(1)"], // Grayscale to original, back to grayscale
          }}
          transition={{
            duration: 4, // Match the duration of the full cycle
            repeat: Infinity, // Loop infinitely
            ease: "easeInOut", // Smooth transition
          }}
        />
      </motion.div>

      <Text
        fontSize={"6xl"}
        textAlign={"center"}
        fontWeight={"thin"}
        color={"whiteAlpha.700"}
        mt={"-5"}
      >
        Xcrypto
      </Text>
    </Box>
  );
};

export default Home;
