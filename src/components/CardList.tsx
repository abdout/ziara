"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CardData {
  title: string;
  value: string;
  description: string;
  change?: string;
  icon?: React.ReactNode;
}

interface CardListProps {
  cards: CardData[];
}

export default function CardList({ cards }: CardListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <CardDescription>
              {card.change && <span className="text-xs text-muted-foreground">{card.change} </span>}
              {card.description}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}