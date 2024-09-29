import { urlFor } from "@/sanity/lib/image";
import {
  PortableText,
  PortableTextComponents,
  PortableTextComponentProps,
} from "@portabletext/react";
import { getImageDimensions } from "@sanity/asset-utils";
import React from "react";

// Composants PortableText avec Tailwind CSS
const portableTextComponents: PortableTextComponents = {
  types: {
    // Composant pour afficher les images avec Tailwind
    image: ({ value }: { value: any }) => {
      const { width, height } = getImageDimensions(value);
      return (
        <img
          src={urlFor(value).width(800).fit("max").auto("format").url()}
          alt={value.alt || "Image sans description"}
          loading="lazy"
          className="mx-auto my-4 h-auto w-full rounded-lg" // Tailwind CSS classes
          style={{
            aspectRatio: width / height,
          }}
          aria-hidden={!value.alt ? true : false}
        />
      );
    },

    // Composant pour les vidéos avec Tailwind
    video: ({ value }: { value: { url: string } }) => (
      <div className="mx-auto my-8 max-w-full text-center">
        <iframe
          src={value.url}
          title="Vidéo"
          width="100%"
          height="400"
          className="rounded-lg shadow-lg"
          allowFullScreen
          loading="lazy"
        />
      </div>
    ),

    // Composant pour les appels à l'action avec Tailwind
    callToAction: ({
      value,
      isInline,
    }: {
      value: { url: string; text: string };
      isInline: boolean;
    }) =>
      isInline ? (
        <a
          href={value.url}
          className="text-primary hover:text-primary-foreground"
        >
          {value.text}
        </a>
      ) : (
        <div className="my-4 rounded-lg bg-blue-100 p-4 text-center">
          <a
            href={value.url}
            className="font-semibold text-primary hover:text-primary-foreground"
          >
            {value.text}
          </a>
        </div>
      ),

    // Composant pour les citations (blockquote) avec Tailwind
    blockquote: ({ children }: PortableTextComponentProps<React.ReactNode>) => (
      <blockquote className="my-6 border-l-4 border-gray-300 pl-4 italic text-gray-600">
        {children}
      </blockquote>
    ),
  },

  marks: {
    // Composant pour les liens avec Tailwind
    link: ({ children, value }: any) => {
      const isExternal = !value.href.startsWith("/");
      return (
        <a
          href={value.href}
          rel={isExternal ? "noopener noreferrer" : undefined}
          target={isExternal ? "_blank" : undefined}
          className="text-primary/80 hover:text-primary"
        >
          {children}
        </a>
      );
    },

    // Composant pour le texte fort (strong) avec Tailwind
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-bold">{children}</strong>
    ),
  },

  // Composant pour les paragraphes avec Tailwind
  block: {
    normal: ({ children }: any) => (
      <p className="my-4 text-lg leading-relaxed text-current dark:text-card-foreground">
        {children}
      </p>
    ),

    // Ajout des composants pour les balises `h1` à `h6`
    h1: ({ children }: any) => (
      <h1 className="my-6 text-4xl font-extrabold leading-tight text-current dark:text-card-foreground">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="my-5 text-3xl font-bold leading-snug text-current dark:text-card-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="my-4 text-2xl font-semibold leading-snug text-current dark:text-card-foreground">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="my-3 text-xl font-medium leading-snug text-current dark:text-card-foreground">
        {children}
      </h4>
    ),
    h5: ({ children }: any) => (
      <h5 className="my-2 text-lg font-medium leading-snug text-current dark:text-card-foreground">
        {children}
      </h5>
    ),
    h6: ({ children }: any) => (
      <h6 className="my-1 text-base font-medium leading-snug text-current dark:text-card-foreground">
        {children}
      </h6>
    ),
  },
};

// Composant principal pour rendre le contenu PortableText avec Tailwind CSS
const BodyComponent = ({ value }: { value: any }) => {
  return <PortableText value={value} components={portableTextComponents} />;
};

export default BodyComponent;
