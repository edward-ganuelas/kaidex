import { Modal, View, Text, StyleSheet, Image, Pressable } from "react-native";

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
                        backgroundColor: pokemonDetail?.color?.name ?? "white",
                    }}
                >
                    <Text>{pokemonDetail.name}</Text>
                    <Text>{pokemonDetail.flavor_text_entries?.[0]?.flavor_text}</Text>
                    {pokemonDetail.sprites?.front_default && (
                        <Image
                            source={{ uri: pokemonDetail.sprites.front_default }}
                            style={{ width: 200, height: 200 }}
                        />
                    )}
                    <Text>Types</Text>
                    {pokemonDetail.types?.map((type: any) => (
                        <Text key={type.type.name}>{type.type.name}</Text>
                    ))}
                    <Text>
                        Abilities:{" "}
                        {pokemonDetail.abilities
                            ?.map((ability: any) => ability.ability.name)
                            .join(", ")}
                    </Text>
                    <Text>Base Experience: {pokemonDetail.base_experience}</Text>
                    <Pressable onPress={props.onClose} style={styles.button}>
                        <View>
                            <Text>Close</Text>
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
    },
    button: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 8,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
});
