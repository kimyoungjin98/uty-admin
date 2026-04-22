const clients = [
  { name: "테크캠퍼스" },
  { name: "스마트웍스" },
  { name: "데이터랩" },
  { name: "클라우드원" },
  { name: "인사이트" },
  { name: "비전AI" },
];

export function Clients() {
  return (
    <section id="clients" className="py-16 border-y border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-muted-foreground mb-8">
          <span className="font-semibold text-foreground">10,000+</span> 기업이 신뢰하는 솔루션
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {clients.map((client) => (
            <div
              key={client.name}
              className="text-lg font-bold text-muted-foreground/60 hover:text-foreground transition-colors"
            >
              {client.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
