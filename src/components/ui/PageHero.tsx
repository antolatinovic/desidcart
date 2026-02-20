interface PageHeroProps {
  title: string;
  description?: string;
  highlight?: string;
}

export default function PageHero({ title, description, highlight }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-primary-800">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(201,169,110,0.1),transparent_60%)]" />
      <div className="relative section py-20 lg:py-24 text-center">
        <h1 className="text-h1 lg:text-display text-white font-serif max-w-3xl mx-auto text-balance">
          {highlight ? (
            <>
              {title}{' '}
              <span className="text-gold">{highlight}</span>
            </>
          ) : (
            title
          )}
        </h1>
        {description && (
          <p className="mt-5 text-base text-primary-300 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
