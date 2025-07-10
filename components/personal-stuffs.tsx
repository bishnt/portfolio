"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, useInView } from "framer-motion"
import { Play, Pause, Star, MoreHorizontal, Heart, Repeat, Shuffle, SkipBack, SkipForward, Volume2 } from "lucide-react"

// Define the Track interface for music data
interface Track {
  id: string
  title: string
  artist: string
  album: string
  duration: string // Formatted duration string (e.g., "3:45")
  liked: boolean
  audioUrl?: string // Optional URL for the audio file
  image?: string // Optional URL for the album art/image
}

// Define the Movie interface for movie data
interface Movie {
  title: string
  year: string
  rating: number
  director: string
  genre: string
  description: string
  image?: string // Optional URL for the movie poster
}

export default function PersonalStuffs() {
  // Ref for Framer Motion's useInView hook to trigger animations when section is visible
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true })

  // State for music player
  const [musicTracks, setMusicTracks] = useState<Track[]>([]) // Stores the list of music tracks
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null) // ID of the currently playing track
  const [isLoading, setIsLoading] = useState(false) // Indicates if audio is loading
  const [currentTime, setCurrentTime] = useState(0) // Current playback time
  const [duration, setDuration] = useState(0) // Total duration of the current track
  const [volume, setVolume] = useState(0.7) // Audio playback volume (0.0 to 1.0)
  const audioRef = useRef<HTMLAudioElement | null>(null) // Ref to the HTML audio element

  // Initial placeholder data for music tracks
  const initialMusicTracks: Track[] = [
    {
      id: "1",
      title: "Sweet Child O' Mine",
      artist: "Guns N' Roses",
      album: "Appetite for Destruction",
      duration: "5:03",
      liked: true,
      audioUrl: "/audio/Sweet Child O' Mine.mp3", // Local audio path
      image: "/sweet.jpg", // Fallback image
    },
    {
      id: "2",
      title: "Back in Black",
      artist: "AC/DC",
      album: "Back in Black",
      duration: "4:15",
      liked: true,
      audioUrl: "/audio/Black in Black.mp3", // Local audio path
      image: "/black.png", // Fallback image
    },
    {
      id: "3",
      title: "Highway to Hell",
      artist: "AC/DC",
      album: "Highway to Hell",
      duration: "3:28",
      liked: true,
      audioUrl: "/audio/Highway to Hell.mp3", // Local audio path
      image: "/highway.jpg", // Fallback image
    },
    {
      id: "4",
      title: "Ye Jo Halka Halka",
      artist: "Ustaad Nusrat Fateh Ali Khan",
      album: "Single",
      duration: "4:12",
      liked: true,
      audioUrl: "/audio/ye jo halka halka.mp3", // Local audio path
      image: "/halka.jpg", // Fallback image
    },
  ]

  // Set music tracks to initial data on component mount
  useEffect(() => {
    setMusicTracks(initialMusicTracks)
  }, []) // Empty dependency array means this runs once on component mount

  // Movie data
  const movies: Movie[] = [
    {
      title: "The Dark Knight",
      year: "2008",
      rating: 9.0,
      director: "Christopher Nolan",
      genre: "Action, Crime, Drama",
      description: "I once wanted to become the Dark Knight himself and fight crime in gotham",
      image: "/dark-knight.jpg", // Placeholder for /dark-knight.jpg
    },
    {
      title: "The Wolf of Wall Street",
      year: "2013",
      rating: 8.2,
      director: "Martin Scorsese",
      genre: "Biography, Comedy, Crime",
      description: "Who doesn't love money and see a millionaire's life? This movie is a perfect example of that.",
      image: "/wolf.jpg", // Placeholder for /wolf.jpg
    },
    {
      title: "The Social Network",
      year: "2010",
      rating: 7.7,
      director: "David Fincher",
      genre: "Biography, Drama",
      description: "Yeah, I love start-ups and if you love stories of start-ups, this movie is a must-watch.",
      image: "/socialnetwork.jpg", // Placeholder for /socialnetwork.jpg
    },
    {
      title: "Oppenheimer",
      year: "2023",
      rating: 8.3,
      director: "Christopher Nolan",
      genre: "Biography, Drama, History",
      description: "The physics that was shown in this movie was just mind-blowing. I loved the way they portrayed the life of J. Robert Oppenheimer.",
      image: "oppenheimer.jpg", // Placeholder for /oppenheimer.jpg
    },
  ]

  // Personal facts data
  const personalFacts: string[] = [
    "Consistency is the key to success.",
    "Thinking in first principles is the best way to solve problems.",
    "Trying to be a better version of myself every day.",
    "I am Batman",
  ]

  // Helper function to format duration from seconds to MM:SS
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Helper function to format current time to MM:SS
  const formatTime = (time: number): string => {
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Callback function for handling loadedmetadata event
  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
      setIsLoading(false)
      audioRef.current.play().catch((e) => {
        console.error("Playback failed after metadata loaded (user interaction required?):", e)
        setIsLoading(false)
        setCurrentlyPlaying(null)
      })
    }
  }, [])

  // Callback function for handling timeupdate event
  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }, [])

  // Callback function for handling ended event
  const handleEnded = useCallback(() => {
    setCurrentlyPlaying(null)
    setCurrentTime(0)
  }, [])

  // Callback function for handling error event
  const handleError = useCallback(() => {
    setIsLoading(false)
    setCurrentlyPlaying(null)
    console.error("Audio playback error occurred.")
  }, [])

  // Effect to manage the single audio instance and its event listeners
  useEffect(() => {
    // Initialize audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.volume = volume // Set initial volume
    }

    const audio = audioRef.current

    // Add event listeners
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)

    // Cleanup function: remove listeners and pause audio when component unmounts
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
      audio.pause()
      audio.src = "" // Clear src to stop loading
      audio.load() // Load an empty source to free up resources
    }
  }, [volume, handleLoadedMetadata, handleTimeUpdate, handleEnded, handleError]) // Dependencies for this effect

  // Effect to update audio volume when volume state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // Function to handle play/pause logic for a specific track
  const handlePlayPause = async (trackToPlay: Track) => {
    const audio = audioRef.current

    if (!audio) {
      console.error("Audio element not initialized.")
      return
    }

    if (currentlyPlaying === trackToPlay.id) {
      // If the same track is playing, pause it
      audio.pause()
      setCurrentlyPlaying(null)
    } else {
      // If a different track or no track is playing, load and play the new track
      setIsLoading(true)
      setCurrentlyPlaying(trackToPlay.id) // Set the new track as currently playing

      if (audio.src !== trackToPlay.audioUrl) {
        audio.src = trackToPlay.audioUrl || "" // Set new audio source
        audio.load() // Load the new source
      }

      // Attempt to play. The actual play might happen after 'loadedmetadata'
      try {
        await audio.play()
      } catch (error) {
        setIsLoading(false)
        setCurrentlyPlaying(null)
        console.error("Initial playback attempt failed (user interaction required?):", error)
      }
    }
  }

  // Function to handle volume changes from the slider
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  // Function to handle seeking (scrubbing) through the track
  const handleSeek = (newTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime) // Update state immediately for smoother UI
    }
  }

  // Function to handle the main play/pause button in the controls
  const handleMainPlayPause = () => {
    if (audioRef.current && currentlyPlaying) {
      // If a track is currently playing, toggle its state
      const track = musicTracks.find(t => t.id === currentlyPlaying);
      if (track) {
        handlePlayPause(track);
      }
    } else if (musicTracks.length > 0) {
      // If nothing is playing, play the first track
      handlePlayPause(musicTracks[0]);
    }
  };


  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-900 text-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 font-mono">
            PERSONAL<span className="text-white/60">.STUFFS</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Spotify-like Music Player */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1 bg-black border border-white/20 rounded-lg overflow-hidden shadow-lg hover:border-white/40 transition-all duration-300"
          >
            {/* Spotify Header */}
            <div className="bg-gradient-to-b from-gray-800 to-black p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-sm">♪</span>
                </div>
                <h3 className="text-lg font-bold">My Playlist</h3>
              </div>
              <div className="text-xs text-white/60">{musicTracks.length} songs • Bishrant Ghimire</div>
            </div>

            {/* Track List */}
            <div className="p-2 max-h-80 overflow-y-auto custom-scrollbar">
              {musicTracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                  className={`flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer transition-colors group ${
                    currentlyPlaying === track.id ? "bg-white/10" : ""
                  }`}
                  onClick={() => handlePlayPause(track)}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded flex items-center justify-center overflow-hidden">
                      {track.image ? (
                        <img
                          src={track.image}
                          alt={track.album}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to placeholder if image fails to load
                            e.currentTarget.src = "https://placehold.co/100x100/000000/FFFFFF?text=Album"
                          }}
                        />
                      ) : (
                        <span className="text-xs text-white">♪</span>
                      )}
                    </div>
                    {/* Play/Pause overlay on track image */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded">
                      {isLoading && currentlyPlaying === track.id ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : currentlyPlaying === track.id ? (
                        <Pause className="w-4 h-4 text-white" />
                      ) : (
                        <Play className="w-4 h-4 text-white ml-0.5" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-sm font-medium truncate ${
                        currentlyPlaying === track.id ? "text-green-400" : ""
                      }`}
                    >
                      {track.title}
                    </div>
                    <div className="text-xs text-white/60 truncate">{track.artist}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {track.liked && <Heart className="w-4 h-4 fill-green-500 text-green-500" />}
                    <MoreHorizontal className="w-4 h-4 text-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="text-xs text-white/40 font-mono w-8 text-right">{track.duration}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Spotify Controls */}
            <div className="border-t border-white/10 p-3">
              <div className="flex items-center justify-center gap-4 mb-2">
                <Shuffle className="w-4 h-4 text-white/40 hover:text-white/60 cursor-pointer transition-colors" />
                <SkipBack className="w-4 h-4 text-white/60 hover:text-white cursor-pointer transition-colors" />
                <button
                  onClick={handleMainPlayPause} // Use the unified main play/pause handler
                  className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-md"
                  aria-label={currentlyPlaying ? "Pause" : "Play"}
                >
                  {isLoading && currentlyPlaying ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : currentlyPlaying ? (
                    <Pause className="w-5 h-5 text-black" />
                  ) : (
                    <Play className="w-5 h-5 text-black ml-0.5" />
                  )}
                </button>
                <SkipForward className="w-4 h-4 text-white/60 hover:text-white cursor-pointer transition-colors" />
                <Repeat className="w-4 h-4 text-white/40 hover:text-white/60 cursor-pointer transition-colors" />
              </div>

              {/* Progress Bar */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/40 w-8 text-left">{formatTime(currentTime)}</span>
                <div
                  className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer relative group"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    const percent = (e.clientX - rect.left) / rect.width
                    handleSeek(percent * duration)
                  }}
                >
                  <div
                    className="h-full bg-green-500 rounded-full transition-all duration-100"
                    style={{ width: duration ? `${(currentTime / duration) * 100}%` : "0%" }}
                  />
                  <div
                    className="absolute -top-1.5 -translate-x-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ left: duration ? `${(currentTime / duration) * 100}%` : "0%" }}
                  />
                </div>
                <span className="text-xs text-white/40 w-8 text-right">{formatTime(duration)}</span>

                {/* Volume Control */}
                <div className="flex items-center gap-1 ml-2">
                  <Volume2 className="w-4 h-4 text-white/40" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => handleVolumeChange(Number.parseFloat(e.target.value))}
                    className="w-16 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:hover:scale-110"
                    style={{
                      background: `linear-gradient(to right, #22C55E 0%, #22C55E ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`,
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* IMDB-like Movies Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2 bg-black border border-white/20 rounded-lg overflow-hidden shadow-lg hover:border-white/40 transition-all duration-300"
          >
            {/* IMDB Header */}
            <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/10 p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
                  <span className="text-black font-bold text-sm">M</span>
                </div>
                <h3 className="text-lg font-bold">Movies I Love</h3>
              </div>
            </div>

            {/* Movies List */}
            <div className="max-h-96 overflow-y-auto custom-scrollbar">
              {movies.map((movie, index) => (
                <motion.div
                  key={movie.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
                  className="p-4 border-b border-white/10 hover:bg-white/5 transition-colors"
                >
                  <div className="flex gap-4">
                    {/* Movie Poster */}
                    <div className="w-20 h-28 bg-gradient-to-b from-gray-600 to-gray-800 rounded flex items-center justify-center flex-shrink-0 overflow-hidden shadow-md">
                      {movie.image ? (
                        <img
                          src={movie.image}
                          alt={`${movie.title} Poster`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to placeholder if image fails to load
                            e.currentTarget.src = "https://placehold.co/150x225/000000/FFFFFF?text=Movie"
                          }}
                        />
                      ) : (
                        <span className="text-xl text-center">🎬</span> // Fallback if no image
                      )}
                    </div>

                    {/* Movie Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-base font-bold text-white">{movie.title}</h4>
                          <div className="text-sm text-white/60">
                            {movie.year} • {movie.director}
                          </div>
                          <div className="text-xs text-white/50">{movie.genre}</div>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded">
                          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                          <span className="text-xs font-mono text-yellow-500">{movie.rating}</span>
                        </div>
                      </div>

                      <p className="text-sm text-white/70 leading-relaxed line-clamp-3">{movie.description}</p>

                      <div className="flex items-center gap-4 mt-3">
                        <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium">
                          + Watchlist
                        </button>
                        <button className="text-xs text-white/60 hover:text-white/80 transition-colors font-medium">Rate</button>
                        <button className="text-xs text-white/60 hover:text-white/80 transition-colors font-medium">Share</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Personal Facts - 4 small cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {personalFacts.map((fact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.05 }}
              className="border border-white/20 p-4 hover:border-white/40 transition-all duration-300 text-center rounded-lg shadow-md bg-gray-800"
            >
              <p className="text-sm text-white/80 leading-relaxed">{fact}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="pt-8 border-t border-white/20 text-center"
        >
          <p className="text-white/60 font-mono text-xs sm:text-sm">
            @ 2025 Bishrant Ghimire. 
          </p>
        </motion.div>

        {/* Mathematical formula overlay (decorative) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
          className="absolute top-10 right-4 lg:right-10 text-white/10 font-mono text-4xl sm:text-6xl hidden lg:block select-none pointer-events-none"
        >
          
        </motion.div>
      </div>

      {/* Custom Scrollbar Style (can be moved to a global CSS file if preferred) */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #333;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #555;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #777;
        }
      `}</style>
    </section>
  )
}