import type { Locale } from '@/lib/i18n';

export type JournalPost = {
  slug: string;
  tag: { en: string; ru: string };
  date: string;
  minutes: number;
  href: string;
  en: {
    title: string;
    lead: string;
    description: string;
    sections: { h: string; paras: string[]; list?: string[] }[];
  };
  ru: {
    title: string;
    lead: string;
    description: string;
    sections: { h: string; paras: string[]; list?: string[] }[];
  };
};

export const journalPosts: JournalPost[] = [
  {
    slug: 'call-to-crm',
    tag: { en: 'Ops', ru: 'Операции' },
    date: '2026-09-18',
    minutes: 7,
    href: '/journal/call-to-crm',
    en: {
      title: 'From a call to CRM records without “another chatbot”',
      lead: 'Conversation intelligence as an approved writeback — not an answer for its own sake.',
      description:
        'Why chatbots fail on live sales and ops calls, and how approved writeback turns transcripts into CRM facts.',
      sections: [
        {
          h: 'The wrong product',
          paras: [
            'Most “AI for calls” demos end in a chat window. Someone pastes a question, the model answers, the room applauds. Then the sales curator hangs up, opens CRM, and types the rate, the promise and the next step by hand — or does not type them at all.',
            'A chatbot optimises for an answer. Operations optimise for a fact that survives the call. Those are different products.',
          ],
        },
        {
          h: 'What actually breaks',
          paras: [
            'On a live negotiation the valuable residue is not prose. It is structured commitments: quoted rate, validity, lane, who promised what, by when, and whether the deal is real or theatre.',
            'If that residue never lands in CRM / TMS, the organisation keeps three versions of truth: the recording, the curator’s memory, and the empty card. Analytics on empty cards is fiction.',
          ],
          list: [
            'Rate and currency said on the call',
            'Promise to the client or the carrier',
            'Next action and owner',
            'Objections that should block a silent close',
          ],
        },
        {
          h: 'Writeback, not chat',
          paras: [
            'The useful pipeline is boring on purpose: PBX → speech recognition → score / extract → knowledge base → human confirm → write into CRM.',
            'The model proposes a draft change. A human confirms. Only then does the system of record move. No silent writes on day one. Auto-confirm rises later, when eval numbers allow it — not because a vendor slide said “agents”.',
          ],
        },
        {
          h: 'Why “another chatbot” fails here',
          paras: [
            'Chat has no accountability lane. Nobody knows who accepted which suggestion. Provenance dies. When a wrong rate enters CRM, you cannot reconstruct the path.',
            'Chat also invites L3 fantasies: full autonomy on money and promises. That is the fastest way to lose trust with curators who already own the relationship.',
          ],
        },
        {
          h: 'What to measure instead of “wow”',
          paras: [
            'Minutes from hang-up to a confirmed CRM field. Share of real talks that produce a proposal. False-positive rate on rates. Share of proposals accepted without edit. Those numbers decide Go / No-Go — not a polished transcript UI.',
          ],
        },
        {
          h: 'Bottom line',
          paras: [
            'Conversation intelligence is a writeback system with a human in the loop. If your pilot cannot change a CRM field under audit, you bought theatre. If it can — you bought an operations layer.',
          ],
        },
      ],
    },
    ru: {
      title: 'От звонка к CRM без «ещё одного чат-бота»',
      lead: 'Разведка переговоров как запись в CRM после подтверждения — не ответ ради ответа.',
      description:
        'Почему чат-боты проигрывают на живых переговорах и как запись в CRM после подтверждения превращает расшифровку в факты учёта.',
      sections: [
        {
          h: 'Не тот продукт',
          paras: [
            'Большинство демо «ИИ по звонкам» заканчиваются окном чата. Кто-то вставляет вопрос, модель отвечает, зал хлопает. Куратор кладёт трубку, открывает CRM и вручную набирает ставку, обещание и следующий шаг — или не набирает вовсе.',
            'Чат-бот оптимизирует ответ. Операции оптимизируют факт, который переживает звонок. Это разные продукты.',
          ],
        },
        {
          h: 'Что реально ломается',
          paras: [
            'В живых переговорах ценность — не красивый текст. Это структурированные обязательства: названная ставка, срок действия, плечо, кто что обещал, к какому сроку, и был ли разговор по делу.',
            'Если этот остаток не попадает в CRM / TMS, в компании живут три правды: запись, память куратора и пустая карточка. Аналитика по пустым карточкам — вымысел.',
          ],
          list: [
            'Ставка и валюта, сказанные в разговоре',
            'Обещание клиенту или перевозчику',
            'Следующее действие и ответственный',
            'Возражения, из‑за которых нельзя тихо «закрыть» сделку',
          ],
        },
        {
          h: 'Запись в систему, не чат',
          paras: [
            'Рабочая цепочка нарочно скучная: АТС → распознавание речи → оценка / извлечение → база знаний → подтверждение человеком → запись в CRM.',
            'Модель предлагает черновик изменения. Человек подтверждает. Только после этого двигается система учёта. В первые дни — без тихой записи. Доля автоподтверждений растёт позже, когда цифры качества это позволяют — не потому что на слайде написали «агенты».',
          ],
        },
        {
          h: 'Почему «ещё один чат-бот» здесь проигрывает',
          paras: [
            'У чата нет журнала ответственности. Непонятно, кто принял какую рекомендацию. Происхождение факта умирает. Когда в CRM уходит неверная ставка, путь не восстановить.',
            'Чат ещё и провоцирует фантазии о полной автономии на деньгах и обещаниях. Это самый быстрый способ потерять доверие кураторов, у которых и так живые отношения с клиентом.',
          ],
        },
        {
          h: 'Что мерить вместо «вау»',
          paras: [
            'Минуты от конца звонка до подтверждённого поля в CRM. Доля реальных разговоров, из которых рождается предложение. Ложные ставки. Доля предложений, принятых без правки. Эти цифры решают «идём / не идём» — не красивый интерфейс расшифровки.',
          ],
        },
        {
          h: 'Итог',
          paras: [
            'Разведка переговоров — это система записи в учёт с человеком в контуре. Если пилот не умеет под аудитом менять поле CRM — вы купили театр. Если умеет — слой операций.',
          ],
        },
      ],
    },
  },
  {
    slug: 'audit-provenance-hitl',
    tag: { en: 'Method', ru: 'Метод' },
    date: '2026-09-18',
    minutes: 7,
    href: '/journal/audit-provenance-hitl',
    en: {
      title: 'Audit, provenance, human-in-the-loop',
      lead: 'Why an agent without a trace is a demo, not a system. The same logic applies to a TMS and a data warehouse.',
      description:
        'Audit lane, provenance of extracted facts, and a human in the loop — the non-negotiables that separate a demo from a system.',
      sections: [
        {
          h: 'Demo vs system',
          paras: [
            'An agent that answers in a chat and leaves no trail looks clever for five minutes. Then someone asks: who changed the rate, from which utterance, under whose authority? Silence. That is a demo.',
            'A system can reconstruct every material action: who proposed it, who confirmed it, when, why, and from which source fragment. Without that lane you do not have AI over operations — you have plausible text next to a live business.',
          ],
        },
        {
          h: 'Three things that must travel together',
          paras: [
            'Audit is the immutable journal of actions. Provenance is the link from a CRM field or a warehouse fact back to the raw evidence. Human-in-the-loop is the role that may promote a draft into the system of record.',
            'Drop any one of them and the other two rot. A log without provenance is a timeline of shrugs. Provenance without a human gate becomes auto-fiction. A human without a log is tribal knowledge.',
          ],
          list: [
            'Who proposed / who confirmed',
            'When the decision landed',
            'Why this rule or metric fired',
            'Which source fragment justified the value',
          ],
        },
        {
          h: 'Same discipline for TMS and the warehouse',
          paras: [
            'People treat call writeback and data loads as different tribes. They are not. A rate extracted from a call and a margin loaded from ERP both enter a system of record. Both can poison decisions if the path is opaque.',
            'One standard: no silent writes on day one; every extract carries origin; raise auto-confirm only when eval numbers allow it. Domino card, CRM field, mart row — same contract.',
          ],
        },
        {
          h: 'What “human in the loop” is not',
          paras: [
            'It is not a rubber stamp after the fact. It is a role with authority before the write: curator confirms a rate, analyst signs a baseline, owner accepts a Go / No-Go. The UI must make refuse as cheap as accept.',
            'If the only path is “click through the banner”, you built theatre with a checkbox. If refuse is logged with a reason, you built learning data.',
          ],
        },
        {
          h: 'What to demand before you buy',
          paras: [
            'Ask for the audit record of one bad suggestion. Ask how a wrong warehouse load is traced to the source file and the transform version. Ask who can raise auto-confirm and on which metric.',
            'If the vendor answers with a model name instead of a journal schema, walk away. Models are replaceable. Accountability lanes are not.',
          ],
        },
        {
          h: 'Bottom line',
          paras: [
            'An agent without a trace is a demo. Audit, provenance and a human gate are the operating system under the model. One logic for TMS writeback and warehouse loads — or you will relearn the same failure twice.',
          ],
        },
      ],
    },
    ru: {
      title: 'Аудит, происхождение фактов, человек в контуре',
      lead: 'Агент без следа — демо, не система. Одна логика для TMS и хранилища данных.',
      description:
        'Журнал действий, происхождение извлечённых фактов и человек в контуре — то, без чего пилот остаётся театром.',
      sections: [
        {
          h: 'Демо против системы',
          paras: [
            'Агент, который отвечает в чате и не оставляет следа, выглядит умно пять минут. Потом спрашивают: кто сменил ставку, из какой реплики, по чьему решению? Тишина. Это демо.',
            'Система умеет восстановить каждое существенное действие: кто предложил, кто подтвердил, когда, зачем и из какого фрагмента источника. Без этого контура у вас не ИИ поверх операций — а правдоподобный текст рядом с живым бизнесом.',
          ],
        },
        {
          h: 'Три вещи, которые должны идти вместе',
          paras: [
            'Аудит — неизменяемый журнал действий. Происхождение факта — связь поля CRM или строки витрины с исходным свидетельством. Человек в контуре — роль, которая может превратить черновик в запись в системе учёта.',
            'Уберите любое звено — остальные гниют. Журнал без происхождения — хронология пожатий плечами. Происхождение без человеческого шлюза — автовымысел. Человек без журнала — устное предание.',
          ],
          list: [
            'Кто предложил / кто подтвердил',
            'Когда решение зафиксировали',
            'Почему сработало правило или метрика',
            'Какой фрагмент источника обосновал значение',
          ],
        },
        {
          h: 'Одна дисциплина для TMS и хранилища',
          paras: [
            'Запись из звонка и загрузку в хранилище часто считают разными мирами. Это ошибка. Ставка из переговоров и маржа из ERP одинаково попадают в систему учёта. Обе отравят решения, если путь непрозрачен.',
            'Один стандарт: в первые дни без тихой записи; у каждого извлечения — источник; долю автоподтверждений поднимаем только по цифрам качества. Карточка Domino, поле CRM, строка витрины — один контракт.',
          ],
        },
        {
          h: 'Чем «человек в контуре» не является',
          paras: [
            'Это не штамп постфактум. Это роль с полномочием до записи: куратор подтверждает ставку, аналитик подписывает исходный уровень, владелец принимает «идём / не идём». В интерфейсе отказ должен быть таким же дешёвым, как согласие.',
            'Если единственный путь — «прокликать баннер», вы построили театр с галочкой. Если отказ пишется в журнал с причиной — вы копите данные для обучения системы.',
          ],
        },
        {
          h: 'Что требовать до покупки',
          paras: [
            'Попросите журнал по одной плохой рекомендации. Спросите, как ошибочная загрузка в хранилище ведётся до исходного файла и версии преобразования. Спросите, кто и по какой метрике поднимает автоподтверждение.',
            'Если вместо схемы журнала называют имя модели — уходите. Модели меняются. Контур ответственности — нет.',
          ],
        },
        {
          h: 'Итог',
          paras: [
            'Агент без следа — демо. Аудит, происхождение фактов и человеческий шлюз — операционная система под моделью. Одна логика для записи в TMS и загрузок в хранилище — иначе ту же ошибку выучите дважды.',
          ],
        },
      ],
    },
  },
];

export function getJournalPost(slug: string): JournalPost | undefined {
  return journalPosts.find((p) => p.slug === slug);
}

export function journalCopy(post: JournalPost, locale: Locale) {
  return locale === 'ru' ? post.ru : post.en;
}
