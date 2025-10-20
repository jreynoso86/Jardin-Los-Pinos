# Video Background for Hero Section

## Adding Your Video

To add a video background to the hero section:

1. **Place your video files in this directory:**
   - `hero-video.mp4` (recommended for Safari/iOS)
   - `hero-video.webm` (recommended for Chrome/Firefox)

2. **Video Specifications:**
   - Resolution: 1920x1080 (Full HD) or higher
   - Length: 10-30 seconds (loops automatically)
   - File size: Keep under 5MB for best performance
   - Format: MP4 (H.264) and WebM (VP9)
   - Framerate: 30fps
   - No audio needed (video is muted)

3. **Recommended Content:**
   - Footage of the garden venue
   - Outdoor ceremony setup
   - Venue grounds and nature
   - Slow, smooth camera movements

## Free Video Sources

If you need stock videos:
- Pexels Videos: https://www.pexels.com/videos/
- Pixabay Videos: https://pixabay.com/videos/
- Videvo: https://www.videvo.net/

Search terms: "garden", "wedding venue", "outdoor event", "nature", "garden party"

## Optimizing Your Video

Use FFmpeg to optimize your video:

### Convert to MP4:
```bash
ffmpeg -i input.mov -c:v libx264 -preset slow -crf 22 -c:a aac -b:a 128k -vf scale=1920:1080 hero-video.mp4
```

### Convert to WebM:
```bash
ffmpeg -i input.mov -c:v libvpx-vp9 -b:v 2M -vf scale=1920:1080 hero-video.webm
```

## GIF Fallback

Place a GIF file at: `images/hero-background.gif`

The GIF will be used if:
- Video files are not available
- Browser doesn't support video
- User has low bandwidth

Create GIF from video:
```bash
ffmpeg -i hero-video.mp4 -vf "fps=15,scale=1280:-1:flags=lanczos" -loop 0 ../images/hero-background.gif
```

## Performance Tips

1. Compress videos to reduce file size
2. Use short loops (10-20 seconds)
3. Consider lazy loading for mobile devices
4. Test on slow connections
