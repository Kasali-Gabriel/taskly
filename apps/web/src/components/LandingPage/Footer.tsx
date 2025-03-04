'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Facebook,
  GlobeIcon,
  Instagram,
  Linkedin,
  SendHorizontal,
  Youtube,
} from 'lucide-react';

import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import footerData from '../../constants/footerData';
import { AppStoreButton, PlayStoreButton } from '../Buttons/DownloadApp';
import { Input } from '../ui/input';

interface FooterSectionProps {
  header: string;
  links: { url: string; text: string }[];
}

const socialIcons = [
  { Icon: () => <FontAwesomeIcon icon={faXTwitter} />, label: 'Twitter' },
  { Icon: Linkedin, label: 'Linkedin' },
  { Icon: Facebook, label: 'Facebook' },
  { Icon: Instagram, label: 'Instagram' },
  { Icon: Youtube, label: 'Youtube' },
];

const NewsletterSubscription = () => (
  <div className="w-48 flex-col p-5 text-start sm:w-72 lg:w-60 xl:w-72">
    <h2 className="text-lg font-medium sm:text-xl">Newsletter Subscription</h2>

    <p className="my-3 text-sm text-gray-500 sm:text-base">
      Don't miss the latest updates! <br /> Subscribe to our newsletter to get
      news, tips, and special offers straight into your inbox.
    </p>

    <div className="relative flex flex-row items-center justify-start space-x-2">
      <Input
        type="email"
        placeholder="Example@gmail.com"
        className="h-10 w-[185px] rounded-xl placeholder:text-sm sm:h-14 sm:w-[300px] sm:p-2 sm:text-base sm:placeholder:text-base"
      />

      <SendHorizontal
        size={28}
        strokeWidth={1.25}
        className="absolute -right-7 scale-[0.7] cursor-pointer sm:right-4 sm:scale-100 xl:right-2"
      />
    </div>
  </div>
);

const handleClick = (e: React.MouseEvent<HTMLElement>, url?: string) => {
  e.preventDefault();
  if (!url) return;

  if (url.startsWith('#')) {
    document
      .getElementById(url.substring(1))
      ?.scrollIntoView({ behavior: 'smooth' });
  } else if (url.startsWith('http') || url.startsWith('www.')) {
    window.open(url.startsWith('www.') ? `https://${url}` : url, '_blank');
  }
};

const FooterSection = ({ header, links }: FooterSectionProps) => (
  <div className="flex flex-col p-5 text-start">
    <h2 className="text-lg font-medium sm:text-xl">{header}</h2>
    <ul className="mt-3 space-y-2 text-sm sm:text-base xl:space-y-3">
      {links.map(({ url, text }, index) => (
        <li key={index}>
          <div
            className="cursor-pointer text-gray-500 hover:text-gray-900"
            onClick={(e) => handleClick(e, url)}
          >
            {text}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center bg-blue-100 px-2 sm:px-10 md:px-14 xl:px-28">
      <div className="grid w-full grid-cols-2 gap-x-10 pt-10 lg:grid-cols-4">
        <div className="hidden lg:block">
          <NewsletterSubscription />
        </div>

        {footerData.sections.slice(0, 2).map((section: any, index: number) => (
          <FooterSection key={index} {...section} />
        ))}

        <div className="lg:hidden">
          <NewsletterSubscription />
        </div>

        {footerData.sections.slice(2).map((section: any, index: number) => (
          <FooterSection key={index} {...section} />
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center space-x-7 py-10 text-base xl:space-x-10">
        <span className="my-2 font-medium">© 2025 Taskly, Inc</span>

        <span className="my-2 flex flex-row items-center justify-center space-x-2">
          <GlobeIcon size={28} strokeWidth={1} />
          <p>English</p>
        </span>

        <div className="my-2 flex flex-row items-center justify-center space-x-2">
          {socialIcons.map(({ Icon, label }, index: number) => (
            <TooltipProvider key={index} delayDuration={100}>
              <Tooltip>
                <TooltipTrigger>
                  <span className="flex h-10 w-10 transform items-center justify-center space-x-2 rounded-full bg-stone-900 p-2 text-white transition-transform duration-300 hover:bg-gray-300 hover:text-black">
                    <Icon size={22} strokeWidth={1.5} />
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        <div className="my-2 flex items-center justify-center">
          <PlayStoreButton />
          <AppStoreButton />
        </div>
      </div>
    </div>
  );
};

export default Footer;
