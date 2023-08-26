import { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState("");
  const [myGoals, setMyGoals] = useState([]);

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    if (enteredGoalText.trim() === "") {
      return; // Don't add empty goals
    }

    setMyGoals((currentMyGoals) => [
      ...currentMyGoals,
      { text: enteredGoalText, key: Math.random().toString() },
    ]);
    setEnteredGoalText(""); //Clear the input after adding goal
  }

  function removeGoalHandler(goalKey) {
    setMyGoals((currentMyGoals) => {
      return currentMyGoals.filter((goal) => goal.key !== goalKey);
    });
  }
  return (
    <View style={styles.appContainer}>
      <GoalInput
        goalInputHandler={goalInputHandler}
        addGoalHandler={addGoalHandler}
        enteredGoalText={enteredGoalText}
      />

      <View style={styles.goalsContainer}>
        {/* alwaysBounceVertical only applies to iphones*/}

        {/* ScrollView is great for list that end or limited lists*/}

        {/*
        <ScrollView alwaysBounceVertical={false}>
          {myGoals.map((goal) => (
            <View style={styles.goals} key={goal}>
              <Text style={styles.goalText}>{goal}</Text>
            </View>
          ))}
        </ScrollView>*/}

        {/* FlatList is great for very long lists*/}
        {/*
        <FlatList
          data={myGoals}
          renderItem={(itemData) => {
            return (
              <View style={styles.goals}>
                <Text style={styles.goalText}>{itemData.item.text}</Text>
              </View>
            );
          }}
          alwaysBounceVertical={false}
        />*/}
        {/*//////Flatlist Intergrated with a imported component////*/}
        <FlatList
          data={myGoals}
          renderItem={(itemData) => {
            return (
              <GoalItem
                text={itemData.item.text}
                goalKey={itemData.item.key}
                onPress={removeGoalHandler}
              />
            );
          }}
          alwaysBounceVertical={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  goalsContainer: {
    flex: 4,
  },
});
