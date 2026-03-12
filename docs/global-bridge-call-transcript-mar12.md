# Global Bridge Call Transcript — March 12, 2026

**Duration:** ~33 minutes (Part 1: 14:41, Part 2: 18:06)
**Participants:** Vladimir (Autoflux), Irina (Global Bridge), + colleague (Rozel)

---

## KEY DISCOVERY: NOT Real Estate!

**Global Bridge is a legal services company**, not a real estate agency. They used the real estate scenario in the Upwork job posting to filter candidates.

**Actual business:** Company registration services for expats (Russian-speaking clients from Uzbekistan, Kazakhstan, Moldova, Romania, Russia, Ukraine).

---

## Requirements Summary

### Core Problem
- Each registered company has ~10 documents with different expiry dates
- Documents expire at different times (one today, another tomorrow)
- Missing renewal = fines/regulatory risk
- Currently documents scattered across WhatsApp, email, personal storage

### MVP Features
1. **Company Health Dashboard**
   - Green = all documents valid
   - Orange = approaching expiry (30 days warning)
   - Red = expired

2. **Document Management**
   - Upload, view, download documents
   - Admin can correct client entries

3. **Notification Chain**
   - Automatic alerts before expiry (30, 14, 7 days configurable)
   - Email only for MVP (no budget for SMS/WhatsApp)
   - 3000 emails/month free is sufficient (~50 clients)

4. **OCR (Nice to Have)**
   - Extract expiry_date from uploaded documents automatically
   - Different jurisdictions have different document formats (Moscow Oblast vs Belgorod Oblast)
   - But key fields are consistent: "expiry date", company name

5. **PWA**
   - Add to home screen capability
   - Important for clients

6. **Two Panels**
   - Client panel: view their own documents/status
   - Admin panel: manage all clients, upload documents

### Hosting Constraints
- **30% of clients are in Russia** - need server accessible from RF
- Hostinger, Hetzner, Digital Ocean **don't work in Russia**
- They **prefer to avoid Russian services** if possible
- TimeWeb was suggested as option (works in RF)
- Google Cloud won't work (can't host custom apps)
- Need to research alternatives

### Future (Phase 2)
- Native App Store application (Swift)
- Backend can be reused
- WhatsApp notifications (requires Meta Business verification ~3 weeks)

### Budget
- MVP should be **free/minimal cost**
- Can't spend money on notification services
- Server cost (~$10-15/month) is acceptable

---

## Full Transcript

### Part 1 (14:41)

**[Vladimir showing portfolio]**

В целом какой самый большой SaaS продукт вы делали?

**[Shows Global Hair project]**
- Connected Zoho CRM + Meta + Google Ads
- Lead tracking through stages
- AI Copy Generator for ads
- Telegram bot for campaign management
- Google Reviews integration
- Took 3 weeks to build solo

**[Shows Moppity Vineyards project]**
- Wine production management
- Connects WinSight, Xero, internal database, Google Sheets
- AI layer to predict delivery timing
- SKU matching across platforms
- Very complex, ongoing project

**[Shows BeregaTim real estate project]**
- Property listing aggregator for Georgia
- Connects developers, sellers, buyers
- Built on Bubble (2023, old)

**[Client clarifies their actual business]**

Ирина: "На самом деле мы не имеем никакого отношения к недвижимости, мы не занимаемся недвижимостью вообще. Наша компания занимается юридическим направлением."

"Смотрите, мы занимаемся регистрацией бизнеса для экспатов. То есть мы регистрируем компании, и далее по этим компаниям существует большое количество документов — ну, там например до 10 ориентировочно на компанию. То есть она включает документы компании и документы по владельцу компании. И у всех документы разные — разный срок истечения документов."

"Для MVP мы хотим сделать продукт, который позволит управлять компанией клиента и документами клиента, где будет некий дашборд, и клиент будет видеть например здоровье компании — да, он называется дашборд здоровья компании. Если все документы там, все обновлено, все в порядке, ничего не просрочено — то здоровье компании показывает зеленый."

"И дальше система имеет автоматический отсчет до установленных сроков истечения документов — например за 30 дней, за 14 приходит уведомление, и уже здоровье компании снижается, оранжевым..."

---

### Part 2 (18:06)

**[Continuing requirements discussion]**

"Что обновить — показывает, могут быть подсказки. Например, чтобы обновить этот документ, надо сделать это. И дальше когда документ общей экспайрит, тоже приходит уведомление, потом напоминание."

"Плюс система должна позволять скачивать документы, просматривать, обновлять. Клиент приглашается — мы приглашаем по ссылке, либо клиент может зарегистрироваться сам в этой системе, загрузить сам свои документы."

**[About document formats across jurisdictions]**

"Важно например — типов юрисдикции. Из России вы понимаете — Белгородская область, Московская область, Тульская область — и в каждой области тип документа разный. Они все разные — в Белгородской области документ так выглядит, а в Московской области по-другому. Но основные базовые данные там указаны одинаковые — например expiry date, название компании."

"То есть нам не нужно распознавать весь документ, нам нужно распознать expiry date, название компании, можно распознать менеджера компании — ну, какие-то частичные данные в этом документе. То есть научить систему так это делать, если мы сможем и реализовать это на этапе MVP — да, то это идеально."

**[About PWA and future App Store app]**

Ирина: "А далее, когда, например, успешного запуска MVP, теста MVP, нам нужно будет, мы захотим перейти на приложение, да, в App Store. Нужно будет писать новое заново?"

Vladimir: "Нет, нет. Мы, ну, во-первых, смотрите, App Store и другие приложения — они живут на другом языке. Отвечу на вопрос — да, новое заново, но не потому, что это нельзя доработать, а потому что это другая абсолютно среда разработки. Но из положительных вещей — бэкэнд, скорее всего, он будет как един. То есть вам не нужно будет полностью все с нуля разрабатывать, потому что архитектура базовая у вас уже готова."

**[About notifications budget]**

Ирина: "Смотрите, так как это MVP будет бесплатным продуктом, то пока мы не можем тратить деньги за эти уведомления."

Vladimir: "Email есть бесплатный, 3000 отправок можно делать, я думаю, на этапе тестов для ваших клиентов, я думаю, этого будет достаточно. 3000 email в месяц бесплатно."

Ирина: "50 клиентов максимум, и expiration date в каждом документе — она там, это уведомление может приходить раз в год. Количество писем достаточно."

**[About server location]**

Vladimir: "Так, значит, по виртуальному серверу, наверное, выберем TimeWeb, либо, ну, так как у вас в России, ну и чтобы было расположено в России..."

Ирина: "Нет, у нас клиенты из разных стран, они русскоговорящие, но они из Узбекистана, Казахстана, Молдовии, Румынии и России в том числе, из Украины, например. И просто с теми 30% клиентов, которые живут в России, но имеют локальный бизнес, у них там ничего не открывается."

"То есть вообще мы предпочитаем минимально связываться с Россией, но я имею в виду в плане использования каких-то русских сервисов — соответственно, ну, если есть возможность, можно было бы избежать."

Vladimir: "Hostinger это Германия, Hetzner в Германии, Digital Ocean..."

Ирина: "Они не работают в РФ. Мы же уже... А, мы это обсуждали, да?"

Vladimir: "Да. То есть они хорошие, но они в РФ не работают?"

Ирина: "Да, они мощные, но не работают."

**[Call ending]**

Ирина: "Тогда все-таки я предпочитала созвониться. И на сколько времени вам потребуется на переподготовку КП?"

Vladimir: "Сегодня — он что значит да, говорю, назначен. До — по временному. Если что, могу и вообще на все недели сегодня, если у вас вдруг время еще будет провести. Если нет, то завтра."

Ирина: "Хорошо, мы согласуем тогда с вами... Ну все тогда, мы на связи с вами, да?"

Vladimir: "Да, я вам отпишу, два часа мне дайте, я вам скину."

Ирина: "Хорошо, договорились. У нас все время мира. До свидания."

---

## Action Items

1. **Update proposal** for legal/company registration services (not real estate)
2. **Research hosting** that works in Russia but isn't Russian-owned
3. **Add OCR capability** to extract expiry dates from documents
4. **Email-only notifications** for MVP (Resend free tier)
5. **Company health dashboard** as primary feature
6. **Schedule follow-up call** after sending updated proposal
