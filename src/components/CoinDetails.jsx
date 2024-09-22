import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Image,
  Progress,
  Radio,
  RadioGroup,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import Loader from "./Loader";
import axios from "axios";
import { server } from "../index";
import { useParams } from "react-router-dom";
// import { Chart } from "chart.js";
import ErrorComponent from "./ErrorComponent";
import Chart from "./Chart";

const CoinDetails = () => {
  const params = useParams();
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  // const params = useParams();
  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);

        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );

        console.log(chartData);
        setCoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchCoin();
  }, [params.id, currency,days]);

  if (error) return <ErrorComponent message={"Error While Fetching Coin"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box width={"full"} boarderWidth={1}>
            <Chart arr={chartArray} currency={currencySymbol} days={days}/>
          </Box>

          {/*Button */}
          <HStack p="4" overflowX={"auto"}>
            {btns.map((i) => (
              <Button
                disabled={days === i}
                key={i}
                onClick={() => switchChartStats(i)}
              >
                {i}
              </Button>
            ))}
          </HStack>

          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"usd"}>USD</Radio>
              <Radio value={"eur"}>EUR</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={"4"} p="16" alignItem={"flex-start"}>
            <Text fontSize={"small"} alignSelf="center" opacity={0.7}>
              Last Updated On{" "}
              {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>

            <Image
              src={coin.image.large}
              w={"16"}
              h={"16"}
              objectFit={"contain"}
            />

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coin.market_data.current_price[currency]}
              </StatNumber>

              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>

            <Badge fontSize={"2xl"} bgColor={"blackAlpha.800"} color={"white"}>
              {`#${coin.market_cap_rank}`}
            </Badge>
            <CustomBar
              high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
            />

            <Box w={"full"} p={"4"}>
              <Item title={"Max Supply"} value={coin.market_data.max_supply} />
              <Item
                title={"Circulating Supply"}
                value={coin.market_data.circulating_supply}
              />
              <Item
                title={"Market Cap"}
                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
              />

              <Item
                title={"All time low"}
                value={`${currencySymbol}${coin.market_data.atl[currency]}`}
              />
              <Item
                title={"All time high"}
                value={`${currencySymbol}${coin.market_data.ath[currency]}`}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};
<div>
  <p>
  What are your most significant accomplishments and contributions since your last performance evaluation?
Since my last performance evaluation, I developed a troubleshooting guide that reduced resolution times for common issues by 30%. I initiated weekly knowledge-sharing sessions to enhance team collaboration and keep everyone updated on best practices. Additionally, I worked on the MIS module, focusing on the front-end design and implementing the DNC upload feature to streamline data management. My handling of escalated support requests has also contributed to an increase in customer satisfaction ratings. Overall, I have sought feedback to continuously improve our processes and service delivery.
What professional support will help you improve or develop your performance in your current job?
To enhance my performance, I would benefit from training in server management and advanced troubleshooting techniques for both physical and virtual environments. Support in pursuing an AWS certification would expand my cloud knowledge for future projects. Additionally, mentorship in automation tools like Python would help streamline processes. Conducting more product knowledge sessions and training on new functionalities would ensure we align with evolving requirements. Workshops on security best practices and opportunities to attend conferences on emerging technologies would further aid my professional development and efficiency in handling complex issues.

                                 OR
•  Training in server management and advanced troubleshooting techniques.
•  Support for pursuing AWS certification to enhance cloud knowledge.
•  Mentorship in automation tools like Python.
•  More product knowledge sessions and training on new functionalities to align with requirements.
•  Workshops on security best practices.
•  Opportunities to attend conferences on emerging technologies.

What do you think your goals should be for the next assessment year?
In the next assessment year, I aim to improve my technical skills and reduce the resolution time for critical, high-priority tickets by 25%. Another goal is to pursue AWS certification to expand my knowledge in cloud technologies, even though we don’t currently use cloud servers. This will prepare me for potential future projects and broaden my expertise. I also plan to contribute to team processes by automating repetitive tasks using Python scripts to improve overall efficiency.
What do you like and dislike about working for this organization?
I appreciate the collaborative atmosphere within the organization, where teamwork is valued and ideas are openly shared and discussed. I admire the supportive leadership, which fosters an environment of continuous learning and professional development. The access to cutting-edge technologies allows me to enhance my skills, and the culture encourages innovation and feedback. While I don't have any major dislikes, I feel there should be more resources allocated for technical support to further improve our efficiency and effectiveness.

  </p>
</div>
const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text fontWeight={"bold"}>{value}</Text>
  </HStack>
);

const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>
  </VStack>
);

export default CoinDetails;
