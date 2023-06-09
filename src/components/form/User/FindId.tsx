import { useState } from "react";
import {
  Input,
  Button,
  Box,
  Heading,
  Container,
  VStack,
  useToast,
  FormControl,
  FormLabel,
  Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { findId } from "api/axios/axiosSetting";

export default function FindId() {
  const { register, handleSubmit } = useForm();
  const [id, setId] = useState(null);
  const toast = useToast();
  const { mutateAsync: findIdHandler, isLoading } = useMutation(
    (data) => findId(data),
    {
      onSuccess: ({ id }) => {
        setId(id);
      },
      onError: () => {
        toast({
          title: "인증 실패",
          description: "일치하는 회원 정보가 존재하지 않습니다.",
          status: "error",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      },
    }
  );
  const onSubmit = (data: any) => {
    findIdHandler(data);
    console.log(data);
  };
  return (
    <Container
      p={4}
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      marginTop="30px"
    >
      <VStack spacing={8}>
        <Heading as="h2" size="lg" mb={4}>
          아이디 찾기
        </Heading>
        <FormControl id="name">
          <FormLabel mb="4" fontWeight="semibold" color="blackAlpha.700">
            이름
          </FormLabel>
          <Input
            type="text"
            {...register("name", { required: true })}
            placeholder="이름을 입력하세요"
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel mb="4" fontWeight="semibold" color="blackAlpha.700">
            이메일
          </FormLabel>
          <Input
            type="email"
            {...register("email", { required: true })}
            placeholder="이메일을 입력하세요"
          />
        </FormControl>

        <FormControl id="phone_number">
          <FormLabel mb="4" fontWeight="semibold" color="blackAlpha.700">
            전화번호
          </FormLabel>
          <Input
            type="number"
            {...register("phone_number", { required: true })}
            placeholder="전화번호를 입력하세요"
          />
        </FormControl>
        <Button
          type="submit"
          w={"100%"}
          backgroundColor="#ff404c"
          color="white"
          colorScheme={"red"}
          isLoading={isLoading}
        >
          아이디 찾기
        </Button>
        {id ? (
          <Flex flexDir="row" fontSize="2xl">
            아이디는 &nbsp;
            <Box color="red" fontWeight="bold">
              "{id}"
            </Box>
            &nbsp;입니다.
          </Flex>
        ) : null}
      </VStack>
    </Container>
  );
}
