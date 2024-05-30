import { Spinner } from "@chakra-ui/react";

const LoadingSpinner = ({ isLoading }) => {
    // (isLoading === undefined) 비교 이유는, 부모 컴포넌트에서 isLoading을 prop으로 넘겨주지 않아도 스피너를 보여주기 위함
    return (
        <>
        { (isLoading === undefined || isLoading) &&
            <Spinner thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        }
        </>
    );
};

export default LoadingSpinner;