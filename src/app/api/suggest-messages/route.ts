import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST() {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment. Avoid repeating the question that you sent previously";

    const apiKey = `${process.env.OPENAI_API_KEY}`;
    const baseURL = "https://api.sree.shop/v1";

    if (!apiKey || !baseURL) {
      return new Response('API key or Base URL is missing', { status: 500 });
    }

    const response = await fetch(`${baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'Meta-Llama-3.3-70B-Instruct-Turbo',
        messages: [
          { "role": "user", "content": prompt }
        ],
        max_tokens: 400,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      return new Response(errorText, { status: response.status, headers: { 'Content-Type': 'text/plain' } });
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}