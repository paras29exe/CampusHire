"use client";


import { useRef, useState } from "react";
import { Play } from "lucide-react";

export default function DemoVideoSection() {
  const videoRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handlePlayClick = async () => {
    if (!videoRef.current) return;

    setHasInteracted(true);

    try {
      await videoRef.current.play();
    } catch {}
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            See CampusHire in Action
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Get a comprehensive look at how CampusHire streamlines your campus
            placements, from automating job listings to tracking student
            progress.
          </p>
        </div>

        {/* Video container */}
        <div className="relative max-w-5xl mx-auto aspect-video overflow-hidden rounded-md shadow-2xl">
          {!hasInteracted && (
            <button
              type="button"
              onClick={handlePlayClick}
              aria-label="Play demo video"
              className="absolute inset-0 z-10 flex items-center justify-center bg-transparent"
            >
              <span className="rounded-full bg-blue-600 p-4 shadow-lg transition-transform duration-200 hover:scale-110">
                <Play className="h-12 w-12 text-white" />
              </span>
            </button>
          )}
          <video
            ref={videoRef}
            className="h-full w-full rounded-md object-cover"
            controls={hasInteracted}
            preload="none"
            poster="https://res.cloudinary.com/paras-29/image/upload/v1709300000/campushire-demo-thumbnail.jpg"
            playsInline
          >
            <source
              src="https://res.cloudinary.com/paras-29/video/upload/q_auto:best,f_auto/campushire-demo-video.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Ready to simplify your campus hiring process?
          </p>
          <button
            onClick={() => {
              window.location.href =
                "mailto:paras.webdev404@gmail.com?subject=Demo%20credentials%20request%20for%20CampusHire&body=Hi%20Paras,%0A%0AI%20came%20across%20your%20project%20CampusHire%20and%20I%E2%80%99m%20really%20impressed%20with%20its%20features%20and%20workflow.%0A%0AI%20would%20like%20to%20request%20demo%20credentials%20to%20explore%20the%20platform%20further.%0A%0APlease%20let%20me%20know%20if%20you%20need%20any%20additional%20information%20from%20my%20side.%0A%0ALooking%20forward%20to%20your%20response.%0A%0AThanks%20%26%20Regards,%0A[Your%20Name]%0A[Your%20Organization%20/%20College]";
            }}
            className="mt-2 inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
          >
            Request Demo Credentials
          </button>
        </div>
      </div>
    </section>
  );
}
