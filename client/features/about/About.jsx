import React from 'react'
import { Container, Image } from 'react-bootstrap'

export default function About() {
  return (
    <Container style={{ marginTop: 50 }}>
      <h4 className="text-justify">About Lambda</h4>
      <p className="text-justify">
        The origin story of the Lambda Trampers/Lattes goes all the way back to
        1982 or 1983 when Neville Jackson posted a notice looking for others
        interested in a gay tramping group at the Lambda gay and lesbian coffee
        lounge (in the old Peterborough Building).
      </p>
      <p className="text-justify">
        From that simple beginning, a few years later, a new group called the
        “Lambda Walkers” evolved, offering tramping trips around Canterbury
        every other Sunday. Each walk was led by a group volunteer and cars and
        transport costs were shared. Trips to local spots included Mt Herbert,
        Mt Grey, Kennedys Bush and Port Robinson and even further afield to Peel
        Forest and Arthurs Pass. Eventually the group added long weekends away
        to places like Mt Cook, the West Coast, and Kaikoura. The group also
        instituted social events, such as a mid-winters dinner and a summer
        picnic. During the early years, Ross Edgar was the unofficial leader of
        the group and had members around to his place for planning meetings (and
        often potluck meals), maintaining the growing mailing list (on paper!)
        and sending out walk schedules three times a year (by post!). Ross also
        bravely listed his phone number in advertisements (in the newspaper!)
        and fielded many queries (including “when does the gay bit start?”). A
        few years ago, the group metamorphosed into the two current iterations:
      </p>
      <ul className="text-justify">
        <li>
          Lambda Trampers - for longer and sometimes challenging day trips
        </li>
        <li>
          Lambda Lattes - shorter local walks, ending with a stop at a café.
        </li>
      </ul>

      <p className="text-justify">
        This split allowed activities almost every week of the year, with the
        Trampers and Lattes going out on alternating Sundays. It also encouraged
        participation by a wider range of individuals and abilities. But there
        is a lot of cross-over between the two groups and they occasionally hold
        joint events. The groups continue to evolve in both their activities
        (e.g. overnight tramps and city architecture walks) and methods (now
        advertise via email, web site, Facebook and Meetup) but the ethos
        remains unchanged:{' '}
        <b>
          a welcoming atmosphere for LGBTQ+ people (and their friends) who want
          to spend more time in the great Canterbury outdoors!
        </b>
      </p>
      <h4 className="text-justify">Why Lambda</h4>
      <Image
        src="/img/lambda.svg.png"
        rounded
        style={{
          width: '100px',
          height: '100px',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: 10,
          marginTop: 10,
        }}
      ></Image>
      <p className="text-justify">
        The lambda symbol seems to be one of the most controversial of symbols
        in regard to its meaning. There are several differing opinions as to why
        the lambda was chosen as a gay symbol and what it really means. However,
        most sources agree on a few things:
      </p>

      <p className="text-justify">
        The lambda was first chosen as a gay symbol when it was adopted in 1970
        by the New York Gay Activists Alliance. It became the symbol of their
        growing movement of gay liberation. In 1974, the lambda was subsequently
        adopted by the International Gay Rights Congress held in Edinburgh,
        Scotland. As their symbol for lesbian and gay rights, the lambda became
        internationally popular.
      </p>
      <p className="text-justify">
        But where history ends, speculation begins. No one seems to have a
        definitive answer why the lambda was originally chosen as a gay symbol.
        Some suggest that it is simply the Greek lower-case letter l for
        liberation. Others disagree, citing the use of lambda in physics to
        denote energy (the energy we have when we work in concert) or wavelength
        (are gays and lesbians on a different wavelength?). Lambda may also
        denote the synergy of the gay movement, the idea that the whole is
        greater than the sum of its parts. The lambda also may represent scales
        and balance, and the constant force that keeps opposing sides from
        overcoming each other — the hook at the bottom of the right leg
        signifies the action needed to reach and maintain balance. The ancient
        Greek Spartans regarded the lambda to mean unity, while the Romans
        considered it «the light of knowledge shed into the darkness of
        ignorance».
      </p>
      <p className="text-justify">
        Whatever the exact meaning and origin, the lambda originally embodied a
        fairly militant connotation. Today, the symbol generally denotes
        lesbian’s and gay men’s concerns together. Although the lambda was never
        intended to be linked to any specific gender or orientation such as
        other symbols may be, historically this is not so: In the early 1970’s
        the Los Angeles gay community created a flag with a lavender lambda on a
        simple white background. They hoped the flag would catch on to other
        cities, but their hopes were denied because some saw the lambda as a
        male symbol only.
      </p>
    </Container>
  )
}
