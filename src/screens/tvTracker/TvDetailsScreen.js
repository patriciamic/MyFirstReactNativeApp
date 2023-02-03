import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { StatusBar } from 'expo-status-bar';
import LinearGradient from 'react-native-linear-gradient';
import { DetailsTvData } from "../../data/tvTracker/TvData";
import { TvRepository } from "../../data/tvTracker/TvRepository";
import { FavoriteTvData } from "../../data/tvTracker/TvData";
import { useEffect, useState } from "react";
import CustomButton from '../../components/CustomButton';

function TvDetailsScreen({ route, navigation }) {
    let defaultData = new DetailsTvData(" ", " ", " ", " ", " ")
    const [data, setData] = useState(defaultData)
    const [isFavorite, setIsFavorite] = useState(false)
    const repository = new TvRepository();

    useEffect(() => {
        getData()
    }, [])

    const backdropImage = data.backdropImageName != null
        ? repository.buildImageUrl(data.backdropImageName)
        : require('../../assets/images/ic_image.png');

    const posterImage = data.posterImageName != null
        ? repository.buildImageUrl(data.posterImageName)
        : require('../../assets/images/ic_image.png');

    return (
        <>
            <StatusBar style='light' />
            <View style={styles.container}>
                {data.backdropImageName != null
                    ? <Image source={{ uri: backdropImage }} style={styles.backdropImage} resizeMode='contain' />
                    : <Image source={backdropImage} style={[styles.backdropImage, styles.defaultImage]} resizeMode='contain' />
                }
                <LinearGradient colors={['#000000', '#ffffff00', '#ffffff00']} style={styles.linearGradient} />

                <Pressable style={styles.topNavigationContainer} onPress={goBack}>
                    <Image style={styles.backImage} source={require('../../assets/images/ic_back.png')} />
                </Pressable>
                {data.posterImageName != null
                    ? <Image source={{ uri: posterImage }} style={styles.posterImage} resizeMode='contain' />
                    : <Image source={posterImage} style={[styles.posterImage, styles.defaultImage]} resizeMode='cover' />
                }
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.details}>{data.details}</Text>
                <CustomButton
                    buttonStyle={
                        isFavorite
                            ? [styles.defaultFavoriteButton, styles.addedToFavoriteButton]
                            : styles.defaultFavoriteButton
                    }
                    textStyle={styles.favoriteText}
                    title={isFavorite ? "Added to Favorites" : "Add to Favorites"}
                    onPress={addToFavorite} />
            </View>
        </>
    )

    function getData() {
        async function getAllData() {
            let details = await repository.getTvDetails(route.params.id)
            let favorites = await repository.getFavorites()
            return { details, favorites }
        }

        getAllData().then(({details, favorites}) => {
            setData(details)

            if (favorites == null) return;
            favorites.forEach(item => {
                if (item.id == details.id) {
                    setIsFavorite(true)
                }
            });
        })
    }

    function goBack() {
        navigation.goBack()
    }

    function addToFavorite() {
        if (isFavorite) return;

        repository.addToFavorites(
            new FavoriteTvData(
                data.id,
                data.title,
                data.backdropImageName,
                new Date()
            )
        ).then(() => {
            setIsFavorite(true)

        })
    }
}

export default TvDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#28282B"
    },
    title: {
        color: '#fff',
        marginStart: "40%",
        fontSize: 22,
        width: "55%",
        marginTop: 18
    },
    backdropImage: {
        width: "100%",
        aspectRatio: 1.8,
    },
    defaultImage: {
        tintColor: "#D8BFD8",
        maxHeight: 250,
        aspectRatio: 1.6
    },
    posterImage: {
        width: 120,
        aspectRatio: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        marginTop: "40%",
        marginStart: 25,
        maxHeight: 180
    },
    details: {
        color: '#fff',
        marginHorizontal: 25,
        fontSize: 16,
        position: 'absolute',
        top: "45%",
        left: 0
    },
    linearGradient: {
        width: "100%",
        height: 200,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
    },
    topNavigationContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        marginTop: 60,
        marginStart: 16
    },
    backImage: {
        width: 24,
        height: 24,
        tintColor: '#fff'
    },
    defaultFavoriteButton: {
        position: 'absolute',
        bottom: 16,
        backgroundColor: '#DDA0DD',
        width: "90%",
        borderWidth: 1,
        paddingVertical: 12,
        borderRadius: 8
    },
    addedToFavoriteButton: {
        backgroundColor: '#808080'
    },
    favoriteText: {
        color: "#28282B",
        textAlign: "center",
        fontSize: 18
    }
})