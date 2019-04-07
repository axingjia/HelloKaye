import React, { Component } from 'react';
import { View, Image ,Text,PanResponder,Dimensions ,TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';

class Main extends Component {
	constructor(props){
		super(props);
		this.state={
			sayingToken:['love you', 'mua', 'baby, baby, baby', 'international baby day','woahahahah','love you \nevery day','cutiepie'],
			actualSaying:[{top:50,left:50,s:'Love you'}]
			
		}
		this.actualSaying=['love you'];
		this.imgWidth=0;
		this.imgHeight=0;
		this.deviceWidth = Dimensions.get('window').width;
		this.deviceHeight = Dimensions.get('window').height;
	}
	
	addSaying(){
		var t=this.state.sayingToken[Math.floor(Math.random() * this.state.sayingToken.length)];
		this.actualSaying=this.actualSaying.concat({t:t,top:this.deviceHeight*Math.random(),left:this.deviceWidth*Math.random()});
		this.setState({actualSaying:this.actualSaying});
		
		console.log(this.actualSaying);
		// this.setState({actualSaying:this.state.actualSaying.concat(newSaying)});
	}
	
	handleViewRef = ref => this.view = ref;
	render(){
		
		// let theSaying=this.actualSaying;
		var sayingHTML=this.actualSaying.map((saying,i)=>{
			return <Text key={i} style={{
				position:"absolute",
				fontSize:14,
				left:saying.left,
				top:saying.top}}>{saying.t}</Text>
		});
		console.log(sayingHTML);
		console.log('render');
		const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gestureState) => {
                return true;
            },
            onPanResponderGrant: () => {this.addSaying();this.view.rubberBand(1000).then(endState =>{ console.log(endState.finished ? 'finished' : 'cancelled');});},
            onPanResponderEnd: (e, gestureState) => {
                console.log("pan responder end", gestureState);
                

                return true;
            }
        })
		return (
				
				<View style={{position:"relative",width:this.deviceWidth,height:this.deviceHeight}}>
				
				<Animatable.View style={{flex:1,alignItems: 'center',justifyContent: 'center'}}
				
					{...panResponder.panHandlers} ref={this.handleViewRef}
					
				>
				{/*<Text>haha</Text>*/}
				<Image  
					 source={require('../assets/heart.jpg')}
					 
					 onLayout={(event) => {
  				 		var {x, y, width, height} = event.nativeEvent.layout;
						this.imgWidth=width;
						this.imgHeight=height;
						// console.log('xy',width," ",height);
						
					}}
				 
				   />
				<Text>Love you Kaye =))</Text>
				</Animatable.View>
				
				{sayingHTML}
				</View>
				
				
			
		);
	}
}

export default Main;