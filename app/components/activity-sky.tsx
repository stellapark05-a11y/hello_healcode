import { readActivity, seoulDate } from "@/lib/activity-calendar";

const dayMs = 86400000;

export async function ActivitySky() {
  const today = seoulDate(new Date());
  const midnight = new Date(today + "T00:00:00Z");
  const first = midnight.getTime() - (84 + (midnight.getUTCDay() + 6) % 7) * dayMs;
  const days = Array.from({ length: 91 }, (_, index) => new Date(first + index * dayMs).toISOString().slice(0, 10));
  const totals = await readActivity(days[0], today);
  const weekdays = ["월", "화", "수", "목", "금", "토", "일"];
  return (
    <section className="activity-sky" aria-labelledby="sky-heading">
      <div className="sky-inner">
        <header><h2 id="sky-heading">팀의 활동 별자리</h2>
          <p>{days[0].replaceAll("-", ".")} — {today.replaceAll("-", ".")}</p>
          <p>{totals ? `최근 13주 중 ${Object.keys(totals).length}일 활동` : "노션 활동 기록 연결 대기 중"}</p>
        </header>
        <div>
          <div className="sky-grid">
            <span aria-hidden="true" />
            {weekdays.map(d => <small key={d}>{d}</small>)}
            {days.map((day, index) => {
              const score = totals?.[day] ?? 0;
              const label = day + (totals ? ` · ${score}점` : " · 기록 미연결");
              return <div key={day} className="sky-cell" style={{display:"contents"}}>
                {index % 7 === 0 && <small>{index === 0 || day.slice(8) <= "07" ? Number(day.slice(5,7)) + "월" : ""}</small>}
                {day > today ? <span /> : <span role="img" aria-label={label} title={label} className="sky-mark" data-level={score >= 40 ? 3 : score >= 20 ? 2 : score > 0 ? 1 : 0} data-today={day === today}>{score > 0 ? "❄︎" : "·"}</span>}
              </div>;
            })}
          </div>
          <p className="sky-key">하루 적립 점수 <span>❄︎ 1–19</span><span>❄︎ 20–39</span><span>❄︎ 40+</span></p>
        </div>
      </div>
    </section>
  );
}
