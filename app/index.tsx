import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { getPokeDex, getRegions } from "./utils/api";

interface Pokedex {
  descriptions: Array<Object>;
  id: number;
  is_main_series: boolean;
  name: string;
  names: Array<Object>;
  pokemon_entries: Array<Object>;
  region: Object;
}

export default function Index() {
  const [regions, setRegions] = useState<any[]>([]);
  const [region, setRegion] = useState<Object>("");
  const [pokedex, setPokedex] = useState<Pokedex>({} as Pokedex);

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

  function handleRegionChange(itemValue: string) {
    if (!itemValue) return;
    setRegion(itemValue);
    getPokeDex(itemValue)
      .then((data: any) => {
        console.log("Pokedex:", data);
        setPokedex(data);
      })
      .catch((error) => {
        console.error("Error fetching pokedex:", error);
      });
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Picker
        onValueChange={handleRegionChange}
        style={{ height: 50, width: 200 }}
      >
        <Picker.Item label="Select a region" value={{}} />
        {regions.map((reg) => (
          <Picker.Item key={reg.name} label={reg.name} value={reg.url} />
        ))}
      </Picker>
      <ScrollView>
        {pokedex?.pokemon_entries?.map((pokemon: any) => (
          <View key={pokemon.entry_number}>
            <Text>{pokemon.pokemon_species.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
