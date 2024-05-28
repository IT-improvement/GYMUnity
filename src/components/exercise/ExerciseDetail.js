import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Flex, VStack, HStack, Grid, Image, Box, Button, Heading, Text } from "@chakra-ui/react";

const ExerciseDetail = (props) => {
    const [exercise, setExercise] = useState({});
    const { index } = useParams()

    const fetchExercise = () => { 
        fetch(`${process.env.REACT_APP_SERVER_URL}/exercises?command=read_one&index=${index}`)
            .then(response => response.json())
            .then(data => setExercise(data))
            .catch(err => {
                return;
        });
    };

    useEffect(() => {
        fetchExercise();
    }, [index]);

    return (
        <Flex>
            {exercise ? 
                <Flex direction="column">
                    <Heading>운동법</Heading>
                    <Text>{exercise.userId}</Text>
                    <Text>{exercise.userName}</Text>
                    <Text>{exercise.categoryName}</Text>
                    <Text>{exercise.name}</Text>
                    <Text>{exercise.content}</Text>
                    <Text>{exercise.createDate}</Text>
                    <Text>{exercise.modDate}</Text>
                </Flex>
                : <Text>운동법이 존재하지 않습니다</Text>
            }
        </Flex>
    );
};

export default ExerciseDetail;