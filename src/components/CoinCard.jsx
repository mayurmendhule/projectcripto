import React from 'react'
import { Link } from 'react-router-dom';
import {
    VStack,
    Heading, 
    Text,
    Image,
  } from "@chakra-ui/react";

    const CoinCard = ({id, name, img, symbol, price, currencySymbol = "₹" }) => (
        <Link to={`/coin/${id}`}>
          <VStack
            w={"52"}
            shadow={"lg"}
            p={"8"}
            borderRadius={"lg"}
            border-radius= {'22px'}
            transition={"all 0.3s"}
            m={"4"} 
            css={{
              borderRadius: '20px',
              background: '#eee7e7',
              boxShadow: '-11px 11px 12px #9d9b9f, 11px -11px 12px #ffffff',
              "&:hover": {
                background: "#e3e0e6",
                boxShadow: "-11px 11px 12px #9d9b9f, 11px -11px 12px #ffffff",
                transform: "scale(1.1)",
              },
            }}
          >
            <Image
              src={img}
              w={"10"}
              h={"10"}
              objectFit={"contain"}
              alt={"Exchange"}
            />
            <Heading size={"md"} noOfLines={1}>
              {symbol}
            </Heading>
            <Text noOfLines={1}>{name}</Text>
            <Text noOfLines={1}>{price? `${currencySymbol}${price}`: "NA"}</Text>
          </VStack>
        </Link>
      );

export default CoinCard