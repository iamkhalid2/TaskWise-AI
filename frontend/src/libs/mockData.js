// Mock data for testing frontend without backend

export const DEMO_MODE = true; // Set to false when backend is ready

export const mockUser = {
    _id: 'demo-user-123',
    username: 'Demo User',
    email: 'demo@taskwise.ai',
    profilePic: 'https://avatar.iran.liara.run/public/42',
    credits: 25,
};

export const mockChatHistory = {
    responses: [
        {
            prompt: 'What is React?',
            response: JSON.stringify({
                model1: {
                    name: 'GPT-4o-mini',
                    response: 'React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently update the DOM when data changes.',
                },
                model2: {
                    name: 'Claude 3.5 Sonnet',
                    response: 'React is a declarative, component-based JavaScript library created by Facebook for building interactive user interfaces. It uses a virtual DOM for optimal performance.',
                }
            }),
            modelUsed: 'GPT-4o-mini + Claude 3.5 Sonnet',
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        },
        {
            prompt: 'Explain async/await',
            response: JSON.stringify({
                model1: {
                    name: 'GPT-4o-mini',
                    response: 'async/await is syntactic sugar for promises in JavaScript. The async keyword declares an asynchronous function, while await pauses execution until a promise resolves.',
                },
                model2: {
                    name: 'Claude 3.5 Sonnet',
                    response: 'async/await provides a cleaner way to work with asynchronous code in JavaScript. It makes async code look and behave more like synchronous code, improving readability.',
                }
            }),
            modelUsed: 'GPT-4o-mini + Claude 3.5 Sonnet',
            createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        },
    ]
};

export const mockDualResponse = (prompt) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                response: {
                    model1: {
                        name: 'GPT-4o-mini',
                        response: `This is GPT-4o-mini's response to: "${prompt}". It provides detailed technical explanations with code examples when needed.`,
                        model: 'gpt-4o-mini'
                    },
                    model2: {
                        name: 'Claude 3.5 Sonnet',
                        response: `This is Claude 3.5 Sonnet's response to: "${prompt}". It offers clear, well-structured answers with a focus on clarity and context.`,
                        model: 'anthropic/claude-3.5-sonnet'
                    }
                },
                prompt: prompt
            });
        }, 2000); // Simulate 2 second API delay
    });
};

export const mockLogin = (loginData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                message: 'Login successful',
                user: mockUser
            });
        }, 1000);
    });
};

export const mockSignup = (signupData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                user: {
                    ...mockUser,
                    username: signupData.username,
                    email: signupData.email,
                }
            });
        }, 1000);
    });
};
