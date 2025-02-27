'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { User, Code, Globe, Github, Twitter, Linkedin, Mail, Briefcase, Coffee, Music } from 'lucide-react';
import { AnimatedContainer, AnimatedItem } from '@/components/ui/animated-container';
import { useAnimations } from '@/lib/hooks/use-animations';
import metadata from '@/lib/config/metadata';

const author = {
  name: metadata.author.name, // "Mateo Nunez"
  title: 'Senior Software Engineer @ BonusX',
  email: metadata.author.email,
  location: 'Colombia roots, Milan vibes',
  avatar: '/images/profile.jpg', // Assuming this is your pic
  bio: "Hey, I'm Mateo Nunez, a Senior Software Engineer at BonusX who's been coding dope shit for over a decade. I'm all about open-source, tweaking my site (mateonunez.dev), and sipping coffee while blasting tunes. Right now, I'm cooking an AI side project that'll drop soon—stay tuned, fam!",
};

const socialLinks = [
  { icon: Github, href: 'https://github.com/mateonunez', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com/mmateonunez', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/in/mateo-nunez', label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${author.email}`, label: 'Email' },
];

// Skills - your tech stack, no fluff
const skills = {
  languages: ['JavaScript', 'TypeScript', 'Python'],
  frameworks: ['React', 'Next.js', 'Node.js'],
  tools: ['Git', 'Docker', 'AWS'],
};

// What you're up to - straight from your X post
const currentWork = [
  'Cooking an AI side project (open-source soon)',
  'Refactoring mateonunez.dev',
  'Keeping legacy code alive',
  "Chillin' with coffee and tunes",
];

// Badges - simple and to the point
const profileBadges = [
  { label: 'Web Dev', icon: Code },
  { label: 'Open Source', icon: Github },
  { label: 'Full Stack', icon: Globe },
];

export function AboutMe() {
  const [mounted, setMounted] = useState(false);
  const animations = useAnimations();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Summarized bio - short and sweet, your style
  const summarizedBio = `${author.bio.split('. ')[0]}. I dig crafting slick web apps and jamming to Spotify while I code.`;

  return (
    <AnimatedContainer animation="staggerContainer">
      <Card className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
        <CardHeader className="px-4 py-5 md:p-6 border-b border-border/30 bg-muted/20">
          <AnimatedItem>
            <CardTitle className="text-xl md:text-2xl font-hanken flex items-center gap-2">
              <Coffee className="h-5 w-5 text-amber-500" />
              {author.name}
            </CardTitle>
          </AnimatedItem>
          <AnimatedItem>
            <CardDescription className="text-sm md:text-base text-muted-foreground">{author.title}</CardDescription>
          </AnimatedItem>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Profile Section */}
            <AnimatedItem className="p-5 md:p-6 md:w-1/3 flex flex-col items-center md:items-start md:border-r border-border/40">
              <div className="relative w-28 h-28 md:w-32 md:h-32 mb-5 group">
                <motion.div whileHover={animations.hover.scale} transition={animations.transition.spring}>
                  <Avatar className="w-full h-full ring-2 ring-amber-500 ring-offset-2 ring-offset-background transition-all duration-300 group-hover:ring-amber-400">
                    <AvatarImage src={author.avatar} alt={author.name} />
                    <AvatarFallback className="bg-amber-500/10 text-amber-500">
                      <User className="h-12 w-12" />
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
              </div>

              <h1 className="text-lg md:text-xl font-bold mb-2 font-hanken">{author.name}</h1>
              <h2 className="text-sm text-muted-foreground mb-5 flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5 text-amber-500" />
                {author.title}
              </h2>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6 w-full">
                {profileBadges.map((badge, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30 hover:bg-amber-500/20"
                  >
                    {badge.label}
                  </Badge>
                ))}
              </div>

              <div className="mb-5 w-full">
                <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Music className="h-3.5 w-3.5 text-amber-500" />
                  Music Vibes
                </h3>
                <p className="text-xs text-muted-foreground">
                  Catch my latest jams down in the "I've been playing" section.
                </p>
              </div>

              <div className="flex gap-3 mt-auto pt-4">
                {socialLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={index}
                      whileHover={{ scale: 1.15, y: -2 }}
                      transition={animations.transition.spring}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="text-muted-foreground hover:text-amber-500"
                    >
                      <Icon className="h-5 w-5" />
                    </motion.a>
                  );
                })}
              </div>

              <Button
                variant="outline"
                className="w-full mt-6 bg-amber-500/5 border-amber-500/20 text-amber-700 dark:text-amber-300 hover:bg-amber-500/10"
                onClick={() => window.open(`mailto:${author.email}`, '_blank')}
              >
                Keep in touch
              </Button>
            </AnimatedItem>

            {/* Bio & Skills Section */}
            <div className="p-5 md:p-6 md:w-2/3">
              <AnimatedItem className="mb-6">
                <h3 className="text-base font-semibold flex items-center gap-2 mb-3">
                  <User className="h-4 w-4 text-amber-500" />
                  Who I Am
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{summarizedBio}</p>
                <p className="text-sm text-muted-foreground mt-2 italic">{author.location} 🌍</p>
              </AnimatedItem>

              <Separator className="my-6 opacity-50" />

              <AnimatedItem className="mb-6">
                <h3 className="text-base font-semibold flex items-center gap-2 mb-3">
                  <Code className="h-4 w-4 text-amber-500" />
                  My Stack
                </h3>
                <div className="space-y-4">
                  {Object.entries(skills).map(([category, items]) => (
                    <AnimatedItem key={category}>
                      <h4 className="text-xs uppercase text-muted-foreground mb-2 tracking-wider">{category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {items.map((skill, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="text-xs py-0.5 px-2.5 h-6 hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-300"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </AnimatedItem>
                  ))}
                </div>
              </AnimatedItem>

              <Separator className="my-6 opacity-50" />

              <AnimatedItem>
                <h3 className="text-base font-semibold flex items-center gap-2 mb-3">
                  <Globe className="h-4 w-4 text-amber-500" />
                  What I'm Cooking
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Right now, I'm messing with an AI side project (open-source soon), tweaking my site, and keeping some
                  old code alive. All while sipping coffee and vibing to Spotify.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {currentWork.map((work, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-amber-500/5 text-amber-700 dark:text-amber-300 border-amber-500/30"
                    >
                      {work}
                    </Badge>
                  ))}
                </div>
              </AnimatedItem>
            </div>
          </div>
        </CardContent>
      </Card>
    </AnimatedContainer>
  );
}
