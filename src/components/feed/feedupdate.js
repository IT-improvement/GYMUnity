// import { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Box, Button, Card, CardBody, Flex, Grid, Heading, Select, Text, Textarea, Input } from "@chakra-ui/react";
// import Context from "../../Context";
// import Toast from "../chakra/Toast";

// const FeedUpdate = () => {
//     const [feed, setFeed] = useState({
//         title: "",
//         content: "",
//     });
//     const { isLoggedIn, sessionUser } = useContext(Context);
//     const { feedIndex } = useParams()
//     const navigate = useNavigate();

//     const fetchFeed = () => {
//         fetch(`${process.env.REACT_APP_SERVER_URL}/feed/${feedIndex}?${params}`, {
//             method: "GET", 
//             headers: {
//                 "Authorization": sessionUser.code, 
//             }, 
//         })
//         .then(response => response.json())
//         .then(data => setFeed(data))
//         .catch(() => {
//             Toast.showFailed("운동법 불러오기 실패");
//             navigate("/feeds");
//         });
//     };


//     const fetchFeedUpdate = () => {
//         let isUpdated = false;
//         const params =  `title=${feed.title}&` +
//                         `content=${feed.content}&`

//         fetch(`${process.env.REACT_APP_SERVER_URL}/feed/${feed.feedIndex}?command=feedUpdate`, {
//             method: "POST", 
//             headers: {
//                 "Authorization": sessionUser.code, 
//             }, 
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data)
//             if (data.status === 200)
//                 isUpdated = true;
//         })
//         .finally(() => {
//             Toast.show(isUpdated, "피드 수정 성공", "피드 수정 실패");
//             navigate(`/feed/${feed.feedIndex}`);
//         });
//     };

//     const handleFeedFieldOnChange = (e) => {
//         setExercise(oldFeed => {
//             return {...oldFeed, [e.target.name]: e.target.value}
//         });
//     };

//     const handleFeedUpdateOnSubmit = (e) => {
//         e.preventDefault();
//         fetchFeedUpdate();
//     };

//     useEffect(() => {
//         fetchFeed();
//     }, [feedIndex, isLoggedIn]);

//     return (
//         <div>
//                 {
//                     feed ? 
//                     <Card key={feedIndex}>
//                 <CardBody>
//                 <Flex direction="column" p="10px" gap="10px" borderRadius="10px" bgColor="gray.300">
//                     <Link to={`/user/${feed.userCode}`} >
//                         <Card _hover={{backgroundColor: "gray.400"}}>
//                             <CardBody>
//                                 <Flex gap="10px">
//                                     <Avatar src="" size="md"/>
//                                     <Flex direction="column">
//                                         <Text>{feed.userName}</Text>
//                                         <Badge fontSize="15px" colorScheme="pink">
//                                             {feed.userId}
//                                         </Badge>
//                                     </Flex>
//                                 </Flex>
//                             </CardBody>
//                         </Card>
//                     </Link>

//                     <Flex direction="column" gap="10px"> 
//                             <Card _hover={{backgroundColor: "gray.400"}}>
//                                 <CardBody>
//                                     <Flex direction="column" gap="20px">
//                                         <Box>
//                                             <Text fontWeight="bold">제목</Text>
//                                             <Text>{feed.title}</Text>
//                                         </Box>
//                                         <Box>
//                                             <Text fontWeight="bold">내용</Text>
//                                             <Text>{feed.content}</Text>
//                                         </Box>
//                                         <Box>
//                                             <Text fontWeight="bold">작성일</Text>
//                                             <Text>{feed.createDate}</Text>
//                                         </Box>
//                                     </Flex>
//                                 </CardBody>
//                             </Card>

//                         <Card>
//                             <CardBody>
//                                 <Flex justify="space-between">
//                                     <Text>좋아요: {feed.favoriteCount}</Text>
//                                     <Image src={`${process.env.PUBLIC_URL}/images/${feed.checkFavorite ? "liked.png" : "like.png"}`}
//                                     cursor="pointer"
//                                         onClick={() => handleLikeButtonOnClick(feedIndex, feed.checkFavorite)}
//                                     />
//                                 </Flex>
//                             </CardBody>
//                         </Card>

//                          <Card>
//                             <CardBody>
//                                 { feed && feed.comments && feed.comments.length > 0 ?
//                                     showComments(feed.comments) :
//                                     <Text>댓글이 없습니다</Text>
//                                 }
//                             </CardBody>
//                         </Card>
                        
//                         { isLoggedIn && (feed.userCode === Number(sessionUser.code)) &&
//                                 <Flex gap="10px">
//                                     <Button colorScheme="blue"
//                                         onClick={() => navigate(`/feed/${feedIndex}/feedupdate`)}>
//                                         수정
//                                     </Button>
//                                     <Button colorScheme="red" onClick={handlePostDeleteOnClick}>삭제</Button>
//                                 </Flex>
//                                 }
//                         <Card>
//                         </Card>
//                     </Flex>
//                 </Flex>
//             </CardBody>
//         </Card>

//                 : <LoadingSpinner></LoadingSpinner>}
                  

//             </div>
//     );
// };

// export default ExerciseUpdate;