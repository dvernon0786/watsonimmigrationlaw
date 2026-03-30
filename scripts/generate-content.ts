#!/usr/bin/env node

import { Anthropic } from '@anthropic-ai/sdk';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface VisaContent {
  name: string;
  slug: string;
  description: string;
  eligibility: {
    requirements: string[];
    benefits: string[];
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  processing: {
    timeline: string;
    cost: string;
    documents: string[];
  };
}

interface AttorneyContent {
  name: string;
  slug: string;
  title: string;
  bio: string;
  credentials: string[];
  image: string;
  email: string;
  phone: string;
}

async function generateVisaPages() {
  const visasDir = path.join(__dirname, '..', 'content', 'visas');
  const files = await fs.readdir(visasDir);

  for (const file of files) {
    if (!file.endsWith('.json')) continue;

    const visaPath = path.join(visasDir, file);
    const visaData: VisaContent = JSON.parse(await fs.readFile(visaPath, 'utf-8'));

    // Generate overview page
    const overviewPrompt = `Write a comprehensive overview page for the ${visaData.name} visa. Include:
- Introduction to the visa
- Key eligibility requirements
- Benefits and advantages
- Processing timeline and costs
- Common FAQs
- Call to action for consultation

Use professional, informative tone suitable for an immigration law website. Include relevant keywords for SEO.`;

    const overviewResponse = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 2000,
      messages: [{ role: 'user', content: overviewPrompt }],
    });

    const overviewContent = overviewResponse.content[0].type === 'text' ? overviewResponse.content[0].text : '';

    // Generate location-specific pages
    const locations = [
      'seattle', 'bellevue', 'redmond', 'kirkland', 'renton',
      'tacoma', 'olympia', 'spokane', 'vancouver-wa', 'portland'
    ];

    for (const location of locations) {
      const locationPrompt = `Write a location-specific page for ${visaData.name} visa applications in ${location.replace('-', ' ')}, Washington. Include:
- Local market insights
- Regional employer opportunities
- Location-specific processing considerations
- Local immigration attorney services
- Call to action

Focus on how Watson Immigration Law serves clients in this area.`;

      const locationResponse = await anthropic.messages.create({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1500,
        messages: [{ role: 'user', content: locationPrompt }],
      });

      const locationContent = locationResponse.content[0].type === 'text' ? locationResponse.content[0].text : '';

      // Save location page
      const locationDir = path.join(__dirname, '..', 'content', 'visas', visaData.slug, location);
      await fs.mkdir(locationDir, { recursive: true });

      const locationFile = path.join(locationDir, 'content.md');
      await fs.writeFile(locationFile, locationContent);
    }

    // Save overview page
    const overviewDir = path.join(__dirname, '..', 'content', 'visas', visaData.slug);
    await fs.mkdir(overviewDir, { recursive: true });

    const overviewFile = path.join(overviewDir, 'overview.md');
    await fs.writeFile(overviewFile, overviewContent);
  }
}

async function generateAttorneyPages() {
  const attorneysDir = path.join(__dirname, '..', 'content', 'attorneys');
  const files = await fs.readdir(attorneysDir);

  for (const file of files) {
    if (!file.endsWith('.json')) continue;

    const attorneyPath = path.join(attorneysDir, file);
    const attorneyData: AttorneyContent = JSON.parse(await fs.readFile(attorneyPath, 'utf-8'));

    const prompt = `Write a professional attorney bio page for ${attorneyData.name}, ${attorneyData.title} at Watson Immigration Law. Include:
- Professional background and experience
- Areas of expertise
- Education and credentials
- Notable cases or achievements
- Approach to client service
- Contact information and call to action

Write in first person from the attorney's perspective. Make it engaging and trustworthy.`;

    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.content[0].type === 'text' ? response.content[0].text : '';

    // Save attorney page
    const attorneyDir = path.join(__dirname, '..', 'content', 'attorneys', attorneyData.slug);
    await fs.mkdir(attorneyDir, { recursive: true });

    const bioFile = path.join(attorneyDir, 'bio.md');
    await fs.writeFile(bioFile, content);
  }
}

async function generateBlogPosts() {
  const blogTopics = [
    'H-1B Visa Processing Times 2024',
    'EB-5 Investment Requirements Update',
    'E-2 Visa for Canadian Entrepreneurs',
    'O-1 Visa for Tech Professionals',
    'L-1 Visa Transfer Process',
    'PERM Labor Certification Guide',
    'I-485 Adjustment of Status',
    'H-4 EAD Work Authorization',
    'TN Visa for NAFTA Professionals',
    'E-3 Visa for Australians'
  ];

  for (const topic of blogTopics) {
    const prompt = `Write a comprehensive blog post about "${topic}" for an immigration law website. Include:
- Current information and updates
- Step-by-step guidance
- Common pitfalls to avoid
- Real-world examples
- Call to action for consultation

Use SEO-friendly structure with headings, and include relevant keywords. Write authoritatively but accessibly.`;

    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 2500,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.content[0].type === 'text' ? response.content[0].text : '';

    // Create frontmatter
    const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const frontmatter = `---
title: "${topic}"
description: "Comprehensive guide to ${topic.toLowerCase()}"
date: "${new Date().toISOString().split('T')[0]}"
author: "tahmina-watson"
authorName: "Tahmina Watson"
tags: ["${topic.split(' ')[0]}", "Immigration", "Guide"]
---

`;

    // Save blog post
    const blogDir = path.join(__dirname, '..', 'content', 'blog');
    await fs.mkdir(blogDir, { recursive: true });

    const blogFile = path.join(blogDir, `${slug}.mdx`);
    await fs.writeFile(blogFile, frontmatter + content);
  }
}

async function main() {
  console.log('Starting content generation...');

  try {
    console.log('Generating visa pages...');
    await generateVisaPages();

    console.log('Generating attorney pages...');
    await generateAttorneyPages();

    console.log('Generating blog posts...');
    await generateBlogPosts();

    console.log('Content generation complete!');
  } catch (error) {
    console.error('Error generating content:', error);
    process.exit(1);
  }
}

main();