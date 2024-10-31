const baseUrl = import.meta.env.VITE_BASE_URL ?? "http://localhost:3000";

const endpoints = {
    projects: `${baseUrl}/projects`,
};

export {baseUrl, endpoints};