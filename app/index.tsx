import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { getPokeDex, getRegions } from "./utils/api";
import PokemonGridItem from "./component/PokeGridItem";

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
  const [pokemonDetail, setPokemonDetail] = useState<Object>({});
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    getRegions()
      .then((data: any) => {
        // console.log("Regions:", data);
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

  function onPokemonPress(pokemon: Object) {
    console.log("Selected Pokemon:", pokemon);
    setPokemonDetail(pokemon);
    setShowModal(true);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Picker onValueChange={handleRegionChange} style={styles.dropdown}>
          <Picker.Item label="Select a region" value={{}} />
          {regions &&
            regions.map((reg) => (
              <Picker.Item key={reg.name} label={reg.name} value={reg.url} />
            ))}
        </Picker>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ gap: 10 }}
        >
          {pokedex?.pokemon_entries?.map((pokemon: any) => (
            <PokemonGridItem
              key={pokemon.entry_number}
              id={pokemon.id}
              pokemon={{ ...pokemon.pokemon_species }}
              onPokemonPress={onPokemonPress}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  dropdown: {
    width: "100%",
  },
  scrollView: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignContent: "center",
  },
});
