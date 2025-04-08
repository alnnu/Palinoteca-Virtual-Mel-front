import { getSession, signOut } from "next-auth/react";
import axios from "axios";

const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL_DEV,
	headers: {
		"Content-Type": "application/json",
	},
});

apiClient.interceptors.request.use(
	async (config) => {
		const session = await getSession();
		if (session?.access) {
			config.headers.Authorization = `Bearer ${session.access}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(new Error(error));
	}
);

apiClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const session = await getSession();
				if (!session?.refreshToken) {
					throw new Error("No refresh token available");
				}

				const refreshResponse = await axios.post(
					`${process.env.NEXT_PUBLIC_BACKEND_URL_DEV}/auth/refresh`,
					{
						refreshToken: session.refreshToken,
					}
				);

				const newAccessToken = refreshResponse.data.access;
				session.access = newAccessToken;

				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				return apiClient(originalRequest);
			} catch (refreshError) {
				await signOut({ redirect: true, callbackUrl: "/login" });
				return Promise.reject(new Error(String(refreshError)));
			}
		}

		return Promise.reject(new Error(error));
	}
);

export default apiClient;
