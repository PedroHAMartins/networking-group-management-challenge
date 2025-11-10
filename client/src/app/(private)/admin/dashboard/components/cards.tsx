import { CardComponent, Typography } from "@/presentation";

const data = {
  recommendations: 12,
  thanked: 6,
};

interface Props {
  approvedUsers: number;
}

export function Cards({ approvedUsers }: Props) {
  return (
    <div className="flex justify-center gap-10">
      <CardComponent
        title="Usuários Aprovados"
        content={
          <Typography type="h1" weight="bold">
            {approvedUsers}
          </Typography>
        }
        className="min-w-[280px] w-[280px]"
      />
      <CardComponent
        title="Indicações feitas"
        content={
          <Typography type="h1" weight="bold">
            {data.recommendations}
          </Typography>
        }
        className="min-w-[280px] w-[280px]"
      />
      <CardComponent
        title="Obrigados"
        content={
          <Typography type="h1" weight="bold">
            {data.thanked}
          </Typography>
        }
        className="min-w-[280px] w-[280px]"
      />
    </div>
  );
}
