import { useState, useEffect } from "react";
import { Box, Container, Heading, VStack, Text, Link, Button, IconButton, useToast } from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Index = () => {
  const [stories, setStories] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetch("https://hn.algolia.com/api/v1/search?query=LLMs")
      .then((response) => response.json())
      .then((data) => setStories(data.hits))
      .catch((error) => console.error("Error fetching stories:", error));
  }, []);

  const addFavorite = (story) => {
    if (!favorites.some((fav) => fav.objectID === story.objectID)) {
      setFavorites([...favorites, story]);
      toast({
        title: "Added to favorites.",
        description: "You've added a story to your favorites.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const removeFavorite = (storyId) => {
    setFavorites(favorites.filter((fav) => fav.objectID !== storyId));
    toast({
      title: "Removed from favorites.",
      description: "You've removed a story from your favorites.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8}>
        <Heading as="h1" size="xl">
          Hacker News Stories on LLMs
        </Heading>
        {stories.map((story) => (
          <Box key={story.objectID} p={5} shadow="md" borderWidth="1px" borderRadius="md" width="full">
            <Heading as="h3" size="md">
              <Link href={story.url} isExternal color="teal.500">
                {story.title}
              </Link>
            </Heading>
            <Text mt={2}>{story.author}</Text>
            <IconButton aria-label="Add to favorites" icon={favorites.some((fav) => fav.objectID === story.objectID) ? <FaHeart /> : <FaRegHeart />} onClick={() => (favorites.some((fav) => fav.objectID === story.objectID) ? removeFavorite(story.objectID) : addFavorite(story))} colorScheme={favorites.some((fav) => fav.objectID === story.objectID) ? "red" : "gray"} />
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;
