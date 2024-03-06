<template>
    <div class="signup">
        <form @submit.prevent="createAccount"
            class="max-w-sm mx-auto max-sm:w-[90%] border p-6 rounded-lg bg-gray-100 border-gray-300 shadow-lg my-20 dark:bg-gray-800 dark:border-none">
            <div class="mb-5">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <input type="text" v-model="username" v-bind="usernameAttrs"
                    class="bg-gray-50 border border-gray-300 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-none"
                    required>
                <div class="text-sm my-2 text-red-600">{{ errors?.username }}</div>
            </div>
            <div class="mb-5">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="email" v-model="email" v-bind="emailAttrs"
                    class="bg-gray-50 border border-gray-300 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-none"
                    required>
                <div class="text-sm my-2 text-red-600">{{ errors?.email }}</div>
            </div>

            <div class="mb-5">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input :type="showPassword ? 'text' : 'password'" v-model="password" v-bind="passwordAttrs"
                    class="bg-gray-50 border border-gray-300 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-none"
                    required>

                <div class="flex items-start my-2">
                    <div class="flex items-center h-5">
                        <input type="checkbox" v-model="showPassword"
                            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300">
                    </div>
                    <label class="ms-2 text-sm font-medium text-gray-900 dark:text-white">show</label>
                </div>

                <div class="text-sm my-2 text-red-600">{{ errors?.password }}</div>
            </div>

            <div class="mb-5">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password Confirm</label>
                <input :type="showPasswordConfirmation ? 'text' : 'password'" v-model="passwordConfirmation"
                    v-bind="passwordConformationAttrs"
                    class="bg-gray-50 border border-gray-300 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-none"
                    required>

                <div class="flex items-start my-2">
                    <div class="flex items-center h-5">
                        <input type="checkbox" v-model="showPasswordConfirmation"
                            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300">
                    </div>
                    <label class="ms-2 text-sm font-medium text-gray-900 dark:text-white">show</label>
                </div>

                <div class="text-sm my-2 text-red-600">{{ errors?.passwordConfirmation }}</div>
            </div>

            <div class="flex items-start mt-10 mb-2">
                <div class="flex items-center h-5">
                    <input type="checkbox"
                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required>
                </div>
                <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-white">I am not a robot</label>
            </div>

            <button type="submit"
                class="text-white bg-emerald-600 hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Sign
                Up</button>

            <div v-if="existingErrorView" class="text-sm my-3 text-red-600">User already exists</div>
            <div class="text-sm mt-4 text-gray-700 dark:text-white">You have already got an account?
                <span @click="goToSignIn" class="text-emerald-600 cursor-pointer font-bold">Sign In</span>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { ref } from "vue";
import * as yup from "yup";
import { useStore, useUsersStore } from "../store";
import HttpRequests from "../server";
import { generateUid, formatAMPM, today, getRandomColor } from "@/utilities";
import type { User } from "@/types";
import { SignIn } from ".";

const schema = yup.object({
    username: yup.string()
        .min(2, "Username must be at least two characters")
        .required("Username is required"),

    email: yup.string()
        .email("Email is not valid")
        .required("Email is required"),

    password: yup.string()
        .min(8, "Password must contain at least eight characters")
        .matches(/[0-9]/i, "Password must contain at least one number")
        .matches(/[a-z]/, "Password must contain at least one lower case letter")
        .matches(/[A-Z]/, "Password must contain at least one upper case letter")
        .matches(/[@!#$%&?"]/i, "Password must contain at least one special character")
        .required("Password is required"),

    passwordConfirmation: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required("Confirm your password")
})

const { values, errors, defineField } = useForm({
    validationSchema: schema
})

const [username, usernameAttrs] = defineField("username");
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");
const [passwordConfirmation, passwordConformationAttrs] = defineField("passwordConfirmation");


const showPassword = ref(false);
const showPasswordConfirmation = ref(false);
const existingErrorView = ref(false);


const createAccount = async () => {

    let existingUser: User | undefined = {
        id: "",
        uid: "",
        username: "",
        email: "",
        password: "",
        avatar: "",
        created: "",
        posts: [],
        admin: false
    };

    await useUsersStore().getAllUsers()
        .then(async () => {

            let lastId = useUsersStore().users
            .sort((user1: User, user2: User) => +user2?.id - +user1?.id)[0]?.id;

            const newUser = {
                id: `${+lastId + 1}`,
                uid: `${generateUid()}`,
                username: values?.username,
                email: values?.email,
                password: values?.password,
                avatar: `https://ui-avatars.com/api/?name=${values?.username}&background=${getRandomColor()}&color=fff`,
                created: `${today} at ${formatAMPM(new Date())}`,
                posts: [],
                admin: false
            }

            existingUser = useUsersStore().users.find(user => {
                if (user?.email === values.email) {
                    return user;
                }
            })

            if (existingUser) {
                existingErrorView.value = true;

            } else {
                existingErrorView.value = false;

                await HttpRequests.post("/users", newUser)
                .then(() => localStorage.setItem("loggedInUser", newUser.uid))
                .then(() => window.location.href = "/")
            }
        })
}

const goToSignIn = () => {
    useStore().displayingView = SignIn;
    localStorage.setItem("displayingView", "SignIn");
}
</script>