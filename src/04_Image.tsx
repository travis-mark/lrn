import React, { useState } from 'react';
import { View, Image, Pressable, Text, ActivityIndicator } from 'react-native';
import { Colors, Styles } from './Style';
import { SafeAreaView } from 'react-native-safe-area-context'

const DogsApp = () => {
    const [imageList, setImageList] = useState([]);
    const [imageSource, setImageSource] = useState(null);
    const [loading, setLoading] = useState(0);
    const [error, setError] = useState("");

    const fetchList = async () => {
        setLoading(loading+1);
        const listResponse = await fetch('https://tl.neocities.org/dogs/index.json');
        setLoading(loading-1);
        if (!listResponse.ok) { setError(listResponse.status); return; }
        const json = await listResponse.json();
        if (typeof(json) != typeof([])) { setError("jsonError"); return; }
        setImageList(json);
    };

    const fetchImage = async () => {
        if (imageList.length == 0) { await fetchList(); }
        setImageSource(imageList[Math.floor(Math.random() * imageList.length)]);
    };

    const ImageLoadView = () => {
        if (loading > 0) {
            return (
                <View style={{ height: 44, borderRadius: 8, margin: 8 }}>
                    <View style={{ flex: 1, padding: 8, justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color={Colors.app} />
                    </View>
                </View>
            );
        } else if (error != "") { 
            return (
                <View style={{ backgroundColor: Colors.error, height: 44, borderRadius: 8, margin: 8 }}>
                    <View style={{ flex: 1, padding: 8, justifyContent: 'center' }}>
                        <Text style={[Styles.text, { color: "white" }]}>{error}</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={{ margin: 8 }}>
                    <Image source={{ uri: imageSource }} style={{ width: "100%", height: 400, borderRadius: 8 }} />
                </View>
            );
        }
        
    }

    return (
        <SafeAreaView style={Styles.safeArea}>
            <ImageLoadView />
            <Pressable onPress={() => fetchImage()}>
                <View style={[Styles.imageView, { minWidth: 44, minHeight: 44, backgroundColor: Colors.app, borderRadius: 8, margin: 8 }]}>
                    <View style={[{ padding: 8 }]}>
                        <Text style={[Styles.text, { color: 'white' }]}>Dogs!</Text>
                    </View>
                </View>
            </Pressable>
        </SafeAreaView>
    )
};

export default DogsApp;