import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class HomeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            text:'',
            isSearchPressed:false,
            word:'Loading...',
            lexicalCategory:'',
            examples:[],
            definition:""
        }
    }

    getWord=(word)=>{
        var searchKeyword=word.toLowerCase();
        var url="https://api.dictionaryapi.dev/api/v2/entries/en/"+word
        return fetch(url)
        .then((data)=>{
                return data.json()
        })
    .then(
        (response)=>{
            var word=response[0].word
            var definition = response[0].meanings[0].definitions[0].definition;
            this.setState({
                word:word.trim(),
                definition:definition.trim()
            })
        }
    )
    }
    render(){
        return(
            <View>
                <View style={styles.inputBoxContainer}>
                <TextInput style={styles.inputBox} 
                onChangeText={text=>{
                    this.setState({
                        text:text,
                        isSearchPressed:false,
                        word:'Loading...',
                        lexicalCategory:'',
                        examples:[],
                        definition:""
                    })
                }}/>
    </View>
                <TouchableOpacity style={styles.goButton}
                onPress={()=>{
                    this.setState({isSearchPressed:true});
                    this.getWord(this.state.text);
                }}>
                    <Text>Search</Text>
                </TouchableOpacity>
                <View style = {styles.cont}>
                    <Text style={styles.tixt}>
                        Word:{" "}
                    </Text>
                    <Text style={styles.tixt}>
                        {this.state.word}
                    </Text>
                </View>

                <View style = {styles.cont}>
                    <Text style={styles.tixt}>
                        Type:{" "}
                    </Text>
                    <Text style={styles.tixt}>
                        {this.state.lexicalCategory}
                    </Text>
                </View>
                
                <View style = {styles.cont}>
                <Text style={styles.tixt}>
                    Definition:{" "}
                </Text>
                <Text style={styles.tixt}>
                    {this.state.definition}
                </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputBox: {
        marginTop: 50,
        width: '80%',
        alignSelf: 'center',
        height: 40,
        textAlign: 'center',
        borderWidth: 4,
        outline: 'none',
      },
      goButton: {
        width: '50%',
        height: 55,
        alignSelf: 'center',
        padding: 10,
        margin: 10,
      },
      inputBoxContainer:{
          flex:0.3,
          alignItems:'center',
          justifyContent:'center',
      },

      cont:{
         alignSelf:'center',
         alignItems:'center',
         justifyContent:'center',
         backgroundColor:'aqua' 
      },
      tixt:{
          fontSize:18,
          fontFamily:'Times New Roman',
          textAlign:'center'
      }
})