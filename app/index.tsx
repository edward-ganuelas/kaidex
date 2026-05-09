import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getRegions } from "./utils/api";

export default function Index() {
  const [regions, setRegions] = useState<any[]>([]);
  useEffect(() => {
    getRegions()
      .then((data: any) => {
        console.log("Regions:", data);
        setRegions(data);
      })
      .catch((error) => {
        console.error("Error fetching regions:", error);
      });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {regions.length > 0 ? (
        regions.map((region: any) => (
          <Text key={region.name}>{region.name}</Text>
        ))
      ) : (
        <Text>Loading regions...</Text>
      )}
    </View>
  );
}
