'use client';

import { motion } from 'framer-motion';
import {
  Book,
  Brain,
  Briefcase,
  Code,
  Coffee,
  Github,
  Globe,
  Linkedin,
  Mail,
  Music,
  Twitter,
  User,
} from 'lucide-react';
import { AnimatedContainer, AnimatedItem } from '@/components/ui/animated-container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useAnimations } from '@/hooks/use-animations';
import personal from '@/lib/config/personal';
import { trimText } from '@/lib/utils';

const iconMap = {
  Code,
  Github,
  Globe,
  User,
  Music,
  Brain,
};

const author = {
  name: personal.name,
  title: personal.title,
  email: personal.email,
  location: personal.location.display,
  avatar: personal.assets.avatar,
  bio: personal.bio.full,
};

const socialLinks = [
  { icon: Github, href: `https://github.com/${personal.social.github}`, label: 'GitHub' },
  { icon: Twitter, href: `https://twitter.com/${personal.social.twitter}`, label: 'Twitter' },
  { icon: Linkedin, href: `https://linkedin.com/in/${personal.social.linkedin}`, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${personal.email}`, label: 'Email' },
];

const skills = personal.skills;
const currentWork = personal.currentWork;
const bookshelf = personal.bookshelf;
const profileBadges = personal.profileBadges.map((badge) => ({
  ...badge,
  icon: iconMap[badge.icon as keyof typeof iconMap],
}));

export function AboutMe() {
  const animations = useAnimations();

  const summarizedBio = personal.bio.short;

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
            <AnimatedItem className="p-4 md:p-6 md:w-1/3 flex flex-col md:items-start md:border-r border-border/40">
              {/* Mobile: Avatar and Text in Row, Desktop: Column */}
              <div className="flex flex-row md:flex-col items-center gap-3 md:gap-0 w-full mb-6 md:mb-0">
                <div className="relative w-20 h-20 md:w-32 md:h-32 flex-shrink-0 md:mb-5 group">
                  <motion.div whileHover={animations.hover.scale} transition={animations.transition.spring}>
                    <Avatar className="w-full h-full ring-2 ring-amber-500 ring-offset-2 ring-offset-background transition-all duration-300 group-hover:ring-amber-400">
                      <AvatarImage src={author.avatar} alt={author.name} />
                      <AvatarFallback className="bg-amber-500/10 text-amber-500">
                        <User className="h-10 md:h-12 w-10 md:w-12" />
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                </div>

                {/* Text content next to avatar on mobile, below on desktop */}
                <div className="flex flex-col flex-1 md:items-center min-w-0">
                  <h1 className="text-base md:text-xl font-bold mb-1.5 md:mb-2 font-hanken">{author.name}</h1>
                  <h2 className="text-xs md:text-sm text-muted-foreground mb-2.5 md:mb-5 flex items-center gap-1.5">
                    <Briefcase className="h-3 md:h-3.5 w-3 md:w-3.5 text-amber-500 flex-shrink-0" />
                    <span className="line-clamp-2">{author.title}</span>
                  </h2>

                  <div className="flex flex-wrap gap-1.5 md:gap-2 md:mb-6 w-full md:justify-center">
                    {profileBadges.map((badge, index) => {
                      const BadgeIcon = badge.icon;
                      return (
                        <Tooltip key={index}>
                          <TooltipTrigger asChild>
                            <Badge
                              variant="outline"
                              className="bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30 hover:bg-amber-500/20 py-1 md:py-1.5 px-2 md:px-2.5 text-xs cursor-pointer"
                            >
                              <BadgeIcon className="h-3 w-3 md:h-3.5 md:w-3.5" />
                              {badge.label}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent className="bg-amber-500/90 text-white border-amber-500/30">
                            {badge.description}
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mb-5 w-full">
                <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Music className="h-3.5 w-3.5 text-amber-500" />
                  Soundtrack
                </h3>
                <p className="text-xs text-muted-foreground">
                  What I’m looping lately, signal over noise. See “I’ve been playing” below.
                </p>
              </div>

              <div className="mb-5 w-full">
                <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Book className="h-3.5 w-3.5 text-amber-500" />
                  Bookshelf
                </h3>
                <p className="text-xs text-muted-foreground">Books that sharpen the blade. No filler.</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {bookshelf.map((book, index) => (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <Badge
                          variant="outline"
                          className="bg-indigo-500/10 text-green-700 dark:text-green-300 border-green-500/30 hover:bg-green-500/20 py-1.5 cursor-pointer"
                        >
                          {trimText(book.label)}
                          <span className="text-xs text-muted-foreground ml-1">- {book.author}</span>
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent className="bg-green-500/90 text-white border-green-500/30 max-w-[250px]">
                        <p className="text-xs">
                          <strong>
                            {book.label} - {book.author}
                          </strong>
                          <br />
                          <span className="text-xs">{book.description}</span>
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-auto pt-4 justify-center md:justify-start">
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
                Get in touch
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
                  Stack, by choice
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
                  In the Lab
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Shipping AIt, a digital alter ego built from my own data. Open-sourcing pieces soon. Tightening this
                  site. Keeping critical legacy alive. Coffee in hand, Spotify humming. If it doesn’t hold up in
                  production, it doesn’t make the cut.
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
