import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Platform, FlatList, StyleSheet } from 'react-native';

import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillInterface {
  id: string;
  name: string;
}

export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillInterface[]>([]);
  const [gretting, setGretting] = useState('');

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill,
    };

    setMySkills((oldState) => [...oldState, data]);
    setNewSkill('');
  }

  function handleRemoveSkill(id: string) {
    setMySkills((oldState) => oldState.filter((skill) => skill.id !== id));
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGretting('Good Morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGretting('Good Afternoon');
    } else setGretting('Good Evening');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Luran</Text>
      <Text style={styles.greetings}>{gretting}</Text>
      <TextInput
        style={styles.input}
        placeholder='New Skill'
        placeholderTextColor='#555'
        value={newSkill}
        onChangeText={setNewSkill}
      />

      <Button title='Add' onPress={handleAddNewSkill} />

      <Text style={[styles.title, { marginTop: 20, marginBottom: 50 }]}>My Skills</Text>

      <FlatList
        data={mySkills}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <SkillCard skill={item.name} onPress={() => handleRemoveSkill(item.id)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  greetings: {
    color: '#a370f7',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 20 : 15,
    marginTop: 30,
    borderRadius: 7,
  },
});
