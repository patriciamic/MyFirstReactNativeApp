import Storage from "./Storage";
import GoalData from "./GoalData";


const KEY_GOALS = "goals"

const GoalStorage = {
    storeAll: async (goals) => {
        await Storage.store(KEY_GOALS, goals);
        return goals;
    },

    getAll: async () => {
        return await Storage.get(KEY_GOALS)
    },

    removeAll: async () => {
       return await Storage.remove(KEY_GOALS)
    }
}

const defaultGoalData = [
    new GoalData('Start a new project', 1, true),
    new GoalData('Create an app where you can add items into a list and also display the list.' +
        'Learned:' +
        '\n- basic ui components (View, Text, TextInput, Button, StyleSheet, FlatList, Image, Switch, Modal)' +
        '\n- basic hooks (useState)', 2, true),
    new GoalData('Delete item when tap on it ', 4, true),
    new GoalData('Add Stack Navigation ', 5, true),
    new GoalData('Pass data between screens.' +
        '\nThe entire list when you enter this screen is received from Home Screen', 6, true),
    new GoalData('Add Bottom Navigation ', 7, true),
    new GoalData('Work with Nested Navigations ', 8, true),
    new GoalData('Add LinearGradient on the Add new goal button in order to write platform specific code to make the entire setup', 9, true),
    new GoalData('Create the Tv Tracker app ', 10, false)
]
export { GoalStorage, defaultGoalData };