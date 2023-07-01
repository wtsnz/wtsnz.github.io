import Image from "next/image";
import Link from "next/link";
import { getPostSlugs } from "@/utils/utils";
import formatDate from "@/utils/formatDate";

const MAX_DISPLAY = 5;

export default async function Home() {
  const posts = await getPostSlugs();

  return (
    <>
      {/* <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      /> */}

      <section className="container mx-auto px-4 py-8 lg:max-w-2xl max-w-2xl">
        <div className="container py-8">
          <div className="items-center lg:flex">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                Hello 👋, I&apos;m Will
              </h2>
              <p className="mt-4">
                I&apos;m a human being who writes software, enjoys music, and lives
                in Vancouver BC 🇨🇦.
              </p>
              <div>
                <div className="-mx-2 mt-6 flex items-center">
                  <a
                    className="mx-2"
                    href="https://twitter.com/wtsnz"
                    aria-label="Twitter"
                  ></a>
                </div>
              </div>
            </div>
            <div className="mt-8 hidden lg:mt-0 lg:block lg:w-1/2">
              <div className="flex items-center justify-center lg:justify-end">
                <div className="max-w-lg">
                  <img
                    className="h-64 w-full rounded-md object-cover object-center"
                    src="https://pbs.twimg.com/profile_images/1312960802786222080/um2ZkT9f_400x400.jpg"
                    alt=""
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 lg:max-w-2xl max-w-2xl">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5 prose dark:prose-invert">
          <p>
            I&apos;ve created software for the Apple devices that live on your wrist,
            your pocket and under your tv using Swift and Objective-C. I love to
            learn. I love to figure out how to write clean, maintainable code. I
            love to work with beautiful designs. And I love a perfectly brewed
            cup of tea! ☕️
          </p>
          <p>
            You can checkout my github profile for things I&apos;m working on,
            and my twitter profile for whatever I feel like retweeting on a
            given day, or learn more about me.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 lg:max-w-2xl max-w-2xl">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-xl md:leading-14">
            Blog
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            I like to sporadically write the occasional thing on my blog. Here&apos;s my latest posts.
          </p>
        </div>

        {posts.slice(0, MAX_DISPLAY).map((post) => {
          return (
            <Link
              key={post.slug}
              href={`/${post.slug}`}
              className="-mx-4 flex px-4 py-2 font-medium hover:bg-orange-50 hover:text-orange-400 md:rounded-md dark:hover:bg-gray-800"
            >
              <div className="flex-1">{post.frontmatter.title}</div>
              <div className="text-gray-600">
                <small>
                  <time dateTime={post.date ?? ""}>{formatDate(post.date)}</time>
                </small>
              </div>
            </Link>
          );
        })}
      </section>

      <section className="container mx-auto px-4 py-8 lg:max-w-2xl max-w-2xl">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5 prose dark:prose-invert">
          <h1>Personal Projects</h1>

          <p>
            There&apos;s always a lot more to consider than code when it comes to
            digital products. The projects below have been a great way for me to
            experience, and be in charge of the full lifecycle of product
            development.
          </p>
          <p>
            The project I&apos;m most proud of was the app that started my App Store
            Career, Tides NZ. It has enjoyed being the #1 Navigation app in New
            Zealand since it&apos;s release in May 2011. As far as I can tell its
            since saturated the NZ market of people looking for Tide
            Predictions, received 500+ ratings with an average rating of 4.8,
            and gave me a little bit of pocket money.
          </p>
        </div>

        <ProjectRow
          title="iPhone Camera Plugin for OBS Studio"
          subtitle="2018 - Current"
          description="I played around with the OBS Studio plugin API in C++ to write a plugin that allows you to stream high quality video from your iPhone's camera over USB."
          url="https://obs.camera/"
          icon="/images/icon_obs_camera.svg"
        />

        <ProjectRow
          title="Telecast Webcam for Macos"
          subtitle="2020 - Current"
          description="Use your iPhone camera as a webcam. An extension to the Camera Plugin for OBS Studio. Windows coming soon."
          url="https://telecast.camera/"
          icon="/images/icon_telecast.png"
        />

        <ProjectRow
          title="Road Code NZ"
          subtitle="2017 - Current"
          description="Learn the New Zealand road code with this app. Me and my co-creator Waleeg decided to make this app so we could learn the motorcycle road code."
          url="https://itunes.apple.com/nz/app/road-code-license-nz/id1163987935?mt=8"
          icon="/images/icon_road_code.png"
        />

        <ProjectRow
          title="Tides NZ"
          subtitle="2011 - Current"
          description="Tides NZ was the first iOS app I created. I got the idea through a summer of skim-boarding, to which knowing what the tide was doing was essential for me and a few friends. Turns out that other people like to know what the tide is doing!"
          url="https://itunes.apple.com/nz/app/tides-nz/id521561961?mt=8"
          icon="/images/icon_tides_nz.png"
        />
      </section>
    </>
  );
}

const ProjectRow = ({ title, subtitle, description, url, icon }: {title: string, subtitle: string, description: string, url: string, icon: string})  => {
  return (
    <a href={url} className="py-2">
      <div className="flex px-4 -mx-4 space-x-4 py-4 md:rounded-lg hover:text-gray-900 hover:bg-orange-50 group">
        <img
          width="80"
          height="80"
          src={icon}
          className="rounded-2xl w-16 h-16"
        />
        <div className="flex-1">
          <div className="text-lg font-semibold group-hover:text-orange-500">
            {title}
          </div>
          <div className="font-mono text-sm text-gray-500">{subtitle}</div>
          <div className="">{description}</div>
        </div>
      </div>
    </a>
  );
};
