import { Modal, View, Text, StyleSheet, Image, Pressable } from "react-native";
import convert from 'color-convert';
import { complement } from 'react-native-color-toolkit';

function convertColorToRGBA(colorName: string, alpha: number = 1): string {
    try {
        const rgb = convert.keyword.rgb(colorName);
        return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
    } catch (error) {
        console.error(`Error converting color: ${colorName}`, error);
        return `rgba(255, 255, 255, ${alpha})`;
    }
}

function getComplementaryColor(colorName: string): string {
    try {
        const rgb = convert.keyword.hex(colorName);
        return complement(rgb);
    } catch (error) {
        console.error(`Error converting color: ${colorName}`, error);
        return 'black';
    }
}

export default function PokemonDetails(props: any) {
    const pokemonDetail = { ...(props.pokemonDetail ?? {}) };
    return (
        <Modal
            visible={props.visible}
            animationType="slide"
            onRequestClose={props.onClose}
            transparent={true}
        >
            <View
                style={{
                    ...styles.container,
                }}
            >
                <View
                    style={{
                        ...styles.contentContainer,
                    }}
                >
                    <Text>{pokemonDetail.names?.find((name: any) => name.language.name === "en")?.name}</Text>
                    <Text>
                        The {" "}
                        {pokemonDetail.genera?.find((genus: any) => genus.language.name === "en")?.genus}
                    </Text>
                    <Text>{pokemonDetail.flavor_text_entries?.filter((entry: any) => entry.language.name === "en")[0]?.flavor_text}</Text>
                    {pokemonDetail.sprites?.front_default && (
                        <Image
                            source={{ uri: pokemonDetail.sprites.front_default }}
                            style={{ width: 200, height: 200 }}
                        />
                    )}
                    <Text>Types: {" "}
                        {pokemonDetail.types?.map((type: any) => type.type.name).join(", ")}
                    </Text>
                    <Text>
                        Abilities:{" "}
                        {pokemonDetail.abilities
                            ?.map((ability: any) => ability.ability.name)
                            .join(", ")}
                    </Text>
                    <Text>Habitat: {pokemonDetail.habitat?.name}</Text>
                    <Pressable onPress={props.onClose} style={{
                        ...styles.button,
                        backgroundColor: convertColorToRGBA(pokemonDetail.color?.name ?? "white", 0.8),
                    }}>
                        <View>
                            <Text style={{
                                color: getComplementaryColor(pokemonDetail.color?.name ?? "white"),
                            }}>Close</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    contentContainer: {
        minHeight: "75%",
        width: "100%",
        borderRadius: 8,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundBlendMode: "multiply",
        gap: 10,
        backgroundColor: "white",
    },
    button: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: "white",
    }
});
