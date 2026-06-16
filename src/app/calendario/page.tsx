"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { IdeasPanel } from "@/components/domain/ideas-panel";
import { useBrand } from "@/lib/brand-context";
import { PLATFORM_VAR } from "@/lib/brands";
import { getEvents, STATUS_META, type CalendarEvent, type EventStatus } from "@/lib/data";
import { cn, DOW_ES, monthLabel } from "@/lib/utils";

function EventChip({ ev }: { ev: CalendarEvent }) {
  return (
    <div
      className="flex items-center gap-1.5 truncate rounded-md border-l-2 bg-surface-2 px-2 py-1 text-[0.7rem] text-ink"
      style={{ borderColor: PLATFORM_VAR[ev.platform] }}
      draggable
    >
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ background: STATUS_META[ev.status].varName }}
      />
      <span className="truncate">{ev.title}</span>
    </div>
  );
}

export default function CalendarioPage() {
  const { brand } = useBrand();
  const today = useMemo(() => new Date(), []);
  const [view, setView] = useState<"mes" | "semana">("mes");
  const [cursor, setCursor] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [ideasOpen, setIdeasOpen] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("ideas")
    ) {
      setIdeasOpen(true);
    }
  }, []);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const events = useMemo(() => getEvents(brand, year, month), [brand, year, month]);
  const eventsByDay = useMemo(() => {
    const m = new Map<number, CalendarEvent[]>();
    events.forEach((e) => {
      const a = m.get(e.day) ?? [];
      a.push(e);
      m.set(e.day, a);
    });
    return m;
  }, [events]);

  const isThisMonth =
    today.getFullYear() === year && today.getMonth() === month;
  const todayDay = isThisMonth ? today.getDate() : -1;

  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7) cells.push(null);

  // Week view: the week containing the reference day
  const ref = new Date(year, month, isThisMonth ? today.getDate() : 15);
  const wkMon = new Date(ref);
  wkMon.setDate(ref.getDate() - ((ref.getDay() + 6) % 7));
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const dt = new Date(wkMon);
    dt.setDate(wkMon.getDate() + i);
    return dt;
  });

  return (
    <>
      <header className="mb-7 flex flex-col gap-4 nav:flex-row nav:items-end nav:justify-between">
        <div className="flex flex-col gap-3">
          <Eyebrow>Calendario · {brand.name}</Eyebrow>
          <div className="flex items-center gap-3">
            <h1 className="serif text-[clamp(1.8rem,3vw,2.5rem)] leading-none">
              {monthLabel(year, month)}
            </h1>
            <div className="flex gap-1">
              <button
                aria-label="Mes anterior"
                onClick={() => setCursor(new Date(year, month - 1, 1))}
                className="grid h-9 w-9 place-items-center rounded-full border border-hair text-muted transition-colors hover:text-ink"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={2} />
              </button>
              <button
                aria-label="Mes siguiente"
                onClick={() => setCursor(new Date(year, month + 1, 1))}
                className="grid h-9 w-9 place-items-center rounded-full border border-hair text-muted transition-colors hover:text-ink"
              >
                <ChevronRight className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <SegmentedControl<"mes" | "semana">
            value={view}
            onValueChange={setView}
            options={[
              { value: "mes", label: "Mes" },
              { value: "semana", label: "Semana" },
            ]}
          />
          <Button className="gap-1.5" onClick={() => setIdeasOpen(true)}>
            <Lightbulb className="h-4 w-4" strokeWidth={2} />
            Tirame ideas
          </Button>
        </div>
      </header>

      <div className="mb-4 flex flex-wrap items-center gap-4">
        {(["scheduled", "draft", "idea", "published"] as EventStatus[]).map((s) => (
          <span key={s} className="label-mono inline-flex items-center gap-2 text-[0.54rem]">
            <span className="h-2 w-2 rounded-full" style={{ background: STATUS_META[s].varName }} />
            {STATUS_META[s].label}
          </span>
        ))}
      </div>

      {view === "mes" ? (
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[680px] overflow-hidden rounded-lg border-l border-t border-hair">
            <div className="grid grid-cols-7">
              {DOW_ES.map((d) => (
                <div
                  key={d}
                  className="label-mono border-b border-r border-hair bg-surface-2 px-2 py-2 text-[0.5rem]"
                >
                  {d}
                </div>
              ))}
              {cells.map((d, i) => (
                <div
                  key={i}
                  className={cn(
                    "min-h-[112px] border-b border-r border-hair p-1.5",
                    d === null && "bg-bg/40",
                  )}
                >
                  {d !== null && (
                    <>
                      <div className="mb-1 flex items-center justify-between">
                        <span
                          className={cn(
                            "num inline-grid h-6 w-6 place-items-center rounded-full text-[0.74rem]",
                            d === todayDay
                              ? "bg-accent text-accent-ink shadow-[var(--glow-accent)]"
                              : "text-muted",
                          )}
                        >
                          {d}
                        </span>
                        {d === todayDay && (
                          <span className="label-mono text-[0.48rem] text-accent">Hoy</span>
                        )}
                      </div>
                      <div className="flex flex-col gap-1">
                        {(eventsByDay.get(d) ?? []).map((ev) => (
                          <EventChip key={ev.id} ev={ev} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto pb-2">
          <div className="grid min-w-[680px] grid-cols-7 gap-2">
            {weekDays.map((dt, i) => {
              const inMonth = dt.getMonth() === month;
              const dayEvents = inMonth ? eventsByDay.get(dt.getDate()) ?? [] : [];
              return (
                <div
                  key={i}
                  className="min-h-[300px] rounded-lg border border-hair bg-surface/50 p-2"
                >
                  <div className="mb-2.5 flex items-center justify-between">
                    <span className="label-mono text-[0.5rem]">{DOW_ES[i]}</span>
                    <span
                      className={cn(
                        "num text-[0.8rem]",
                        dt.getDate() === todayDay && inMonth ? "text-accent" : "text-muted",
                      )}
                    >
                      {dt.getDate()}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {dayEvents.map((ev) => (
                      <div
                        key={ev.id}
                        className="rounded-md border-l-2 bg-surface-2 px-2 py-1.5"
                        style={{ borderColor: PLATFORM_VAR[ev.platform] }}
                      >
                        <div className="num text-[0.6rem] text-faint">{ev.time}</div>
                        <div className="text-[0.74rem] leading-tight text-ink">{ev.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <IdeasPanel open={ideasOpen} onOpenChange={setIdeasOpen} />
    </>
  );
}
