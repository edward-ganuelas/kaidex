import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, View, FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { getPokeDex, getRegions } from "./utils/api";
import PokemonGridItem from "./component/PokeGridItem";
import PokemonDetails from "./component/PokemonDetails";


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
  const [region, setRegion] = useState<string>("");
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
  function onModalClose() {
    setShowModal(false);
    setPokemonDetail({});
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Picker selectedValue={region} onValueChange={handleRegionChange} style={styles.dropdown}>
          <Picker.Item label="Select a region" value={{}} />
          {regions &&
            regions.map((reg) => (
              <Picker.Item key={reg.name} label={reg.name} value={reg.url} />
            ))}
        </Picker>
        <FlatList
          data={pokedex.pokemon_entries}
          keyExtractor={(item: any) => item.entry_number.toString()}
          numColumns={3}
          columnWrapperStyle={{ gap: 10 }}
          renderItem={({ item }: { item: any }) => (
            <PokemonGridItem
              pokemon={{ ...item.pokemon_species }}
              onPokemonPress={onPokemonPress}
            />
          )}
          style={styles.scrollView}
          contentContainerStyle={{ gap: 10 }}
        />
        {pokedex.pokemon_entries && (
          <View style={styles.searchContainer}>
            <TextInput placeholder="Search" style={styles.search} />
          </View>
        )}

      </SafeAreaView>
      <PokemonDetails
        visible={showModal}
        pokemonDetail={pokemonDetail}
        onClose={onModalClose}
      />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start"
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
    flex: 2,
  },
  searchContainer: {
    width: "100%",
    display: "flex",
  },
  search: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  }
});
