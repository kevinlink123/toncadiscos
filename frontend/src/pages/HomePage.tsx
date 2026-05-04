import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { createBox } from "../sdk";
import { names } from "../assets/cool-names";
import { CreateBoxDialog } from "../components/CreateBoxDialog";
import { useJukebox } from "@/hooks/useJukeboxContext";
import { Star, Sparkles } from "lucide-react";
import { SparkleText } from "../components/ui/SparkleText";
import Marquee from "../components/ui/marquee";
import CircleBallIcon from "../components/icons/circleball";
import FanIcon from "../components/icons/fan";
import SpikeIcon from "../components/icons/spike";
import OpensourceIcon from "../components/icons/opensource";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";

export default function HomePage() {
  const { user } = useJukebox();
  const navigate = useNavigate();

  // Function to get a random cool name
  const getRandomCoolName = () => {
    return names[Math.floor(Math.random() * names.length)];
  };

  const handleCreateJukebox = async (name: string) => {
    if (!user?.id) return;

    try {
      const box = await createBox({ name, slug: name, user_id: user.id });
      if (box.slug) {
        navigate(`/play/${box.slug}`);
      }
    } catch (error) {
      console.error("Failed to create box:", error);
      throw error; // Re-throw to let the dialog handle the error
    }
  };

  return (
    <div>
      <div className="flex flex-1 min-h-[calc(98dvh-70px)] items-center justify-center px-5 w-full bg-background/40 pb-8">
        <div className="flex flex-col justify-center lg:flex-row gap-2 sm:gap-8 mx-auto w-[1300px] max-w-full items-center">
          {/* Left: Marketing Text (raw, not in a Card) */}
          <div className="w-fit p-4 text-center md:px-14 lg:px-0 lg:text-left lg:w-fit flex flex-col items-center lg:items-start">
            {/* Mobile: Badge, Heading, SparkleText above video */}
            <div className="lg:hidden w-full flex flex-col items-center mb-4">
              <div
                className="inline-flex items-center gap-2 rounded-full border-2 px-4 py-1.5 text-xs font-bold shadow-md mb-4 mx-auto"
                style={{
                  borderColor: "#000",
                  color: "#000",
                  background: "#fff",
                  boxShadow: "0 2px 8px 0 rgba(0,0,0,0.06)",
                }}
              >
                <Star className="h-4 w-4" />
                100% gratarola y sin ads de mierda!
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex flex-col items-center w-full">
                <span className="text-3xl font-bold leading-tight text-foreground sm:text-5xl sm:leading-tight md:text-6xl lg:text-7xl lg:leading-tight w-fit">
                  Turn any device into a{" "}
                  <span className="mt-2 text-4xl sm:text-6xl md:text-7xl font-bold">
                    <SparkleText>jukebox</SparkleText>
                  </span>
                </span>
              </div>
            </div>
            {/* Desktop: Badge, Heading, Feature List */}
            <div className="hidden lg:block">
              <div
                className="inline-flex rounded-full items-center gap-2 border-2 px-4 py-1.5 text-xs font-bold shadow-md mb-6"
                style={{
                  borderColor: "#000",
                  color: "#000",
                  background: "#fff",
                  boxShadow: "0 2px 8px 0 rgba(0,0,0,0.06)",
                }}
              >
                <Star className="h-4 w-4" />
                100% gratarola y sin ads de mierda!
                <Sparkles className="h-4 w-4" />
              </div>
              <h1 className="my-8 text-3xl font-bold leading-tight text-foreground sm:text-5xl sm:leading-tight md:my-0 md:text-6xl lg:text-7xl lg:leading-tight w-fit">
                Spotify jam me<br className="hidden md:block" />
                <SparkleText>chupa la pija</SparkleText>
              </h1>
              {/* Feature List (desktop only) */}
              <div className="mt-8 flex-col items-start gap-2 md:flex">
                <p className="text-md flex items-center">
                  <span className="mr-2" role="img" aria-label="open-source">
                    🌐
                  </span>
                  Toncadiscos es la alternativa open source a Spotify Jam
                </p>
                <p className="text-md flex items-center">
                  <span className="mr-2" role="img" aria-label="anonymous">
                    🕵️
                  </span>
                  Cuenas anonimas: Ni mail ni nada, funciona sin inscribirte a nada
                </p>
                <p className="text-md flex items-center">
                  <span className="mr-2" role="img" aria-label="sparkles">
                    ✨
                  </span>
                  Comopartis el link y tuki, arranca a agregar canciones
                </p>
                <p className="text-md flex items-center">
                  <span className="mr-2" role="img" aria-label="rocket">
                    🚀
                  </span>
                  Sin instalar nada ni inscribrse a nada (<b><i>sacala del angulo spotify</i></b>)
                </p>
              </div>
            </div>
          </div>
          {/* Right: Portrait Video Card with CTA below video */}
          <Card className="flex-[1] flex flex-col items-center justify-center p-4 sm:p-8 bg-white rounded-2xl shadow-md w-full max-w-[400px] gap-0">
            <h2 className="text-xl md:text-xl font-semibold text-foreground mb-4 text-center">
              Crea un "Toncadisco" y comparti el link a otros para que puedan unirse y agregar canciones a la playlist.
            </h2>
            <div className="w-full justify-center flex">
              <CreateBoxDialog
                onCreate={handleCreateJukebox}
                defaultName={getRandomCoolName()}
              />
            </div>
            <div className="w-full flex justify-center mt-8">
              <div className="rounded-lg shadow overflow-hidden mx-12 w-full aspect-[1/2] bg-black flex items-center justify-center max-w-[275px]">
                <iframe
                  src="https://player.vimeo.com/video/1099164181?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  style={{
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                  }}
                  title="Jukebox - Free alternative to Spotify Collaborative Playlists"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="w-full">
        <Marquee
          items={[
            // Each item is a container element with icon and text
            <span key="collab" className="flex items-center gap-2">
              Playlist Colaborativas
              <CircleBallIcon className="inline-block align-middle text-foreground lg:w-[50px] lg:h-[50px] md:w-10 md:h-10 w-[30px] h-[30px] mx-2" />
            </span>,
            <span key="noapp" className="flex items-center gap-2">
              Sin instalar ninguna app
              <FanIcon
                className="inline-block align-middle mx-2"
                style={{ width: 40, height: 40, verticalAlign: "middle" }}
              />
            </span>,
            <span key="addsongs" className="flex items-center gap-2">
              Agrega canciones desde tu telefono
              <SpikeIcon className="inline-block align-middle text-foreground lg:w-[50px] lg:h-[50px] md:w-10 md:h-10 w-[30px] h-[30px] mx-2" />
            </span>,
            <span key="free" className="flex items-center gap-2">
              100% gratis, sin ads!
              <CircleBallIcon className="inline-block align-middle text-foreground lg:w-[50px] lg:h-[50px] md:w-10 md:h-10 w-[30px] h-[30px] mx-2" />
            </span>,
            <span key="share" className="flex items-center gap-2">
              Comparti el link, deja de pelear por el aux
              <FanIcon
                className="inline-block align-middle mx-2"
                style={{ width: 40, height: 40, verticalAlign: "middle" }}
              />
            </span>,
            <span key="queue" className="flex items-center gap-2">
              Todos eligen canciones!
              <SpikeIcon className="inline-block align-middle text-foreground lg:w-[50px] lg:h-[50px] md:w-10 md:h-10 w-[30px] h-[30px] mx-2" />
            </span>,
          ]}
        />
      </div>
      {/* FAQ Section */}
      <div className="w-full bg-main-light py-16 flex flex-col items-center border-b-4 border-black px-5">
        <h2
          id="faq"
          className="text-3xl md:text-4xl font-bold mb-8 text-center"
        >
          Preguntas Frecuentes
        </h2>
        <div className="w-full max-w-xl flex flex-col gap-4">
          <Accordion type="single" collapsible className="flex flex-col gap-4">
            <AccordionItem value="item-1">
              <AccordionTrigger className="bg-main text-black font-semibold">
                Como nacio este proyecto?
              </AccordionTrigger>
              <AccordionContent>
                Toncadiscos es un fork del proyecto {" "}
                <a className="underline" href="https://github.com/skeptrunedev/jukebox">Jukebox.</a>{" "}
                Queria una alternativa autohosteable a Spotify Jam pero el creador original abandono el desarrollo del mismo hace un tiempo,
                asi que hice un fork y empece a resolver los probemas existentes y a agregar features nuevas.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="bg-main text-black font-semibold">
                Necesito una cuenta para usar Toncadiscos?
              </AccordionTrigger>
              <AccordionContent>
                No hace falta ninguna cuenta para crear o entrar a un Toncadisco.
                Simplemente crea un Toncadiscos y comparti el link!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="bg-main text-black font-semibold">
                Que canciones estan disponibles?
              </AccordionTrigger>
              <AccordionContent>
                Practicamente todo lo que este en Youtube. Si existe en YT, se puede agregar a la cola!
                En un futuro se implementara tambien Spotify como fuente de canciones.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="bg-main text-black font-semibold">
                Tenes alguna idea que quieras agregar?
              </AccordionTrigger>
              <AccordionContent>
                Hacemelo saber para poder implementarla! Como alternativa podes forkear este proyecto o el proyecto original {" "}
                <a className="underline" href="https://github.com/skeptrunedev/jukebox">Jukebox</a>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      {/* Feature Squares Section */}
      <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-0 border-black overflow-hidden my-0!">
        {/* Square 1: Who made this? */}
        <div className="flex flex-col justify-center p-8 min-h-[220px] border-b-4 border-black md:border-b-0 md:border-r-4 bg-main-light">
          <div className="flex items-center mb-4">
            <CircleBallIcon className="mr-4 w-10 h-10 text-black" />
            <span id="who-made-this" className="text-2xl font-bold text-black">
              Quien es el creador del proyecto?
            </span>
          </div>
          <p className="text-lg text-black">
            El creador original del proyecto Jukebox es <b>Skeptrune</b> (Nick Khami), Toncadiscos es un fork que hice
            para poder reparar errores, actualizar librerias y re-escribir logicas para que el proyecto funcione correctamente.
            Tambien cree features nuevas y en un futuro se agregaran otras mas.
          </p>
        </div>
        {/* Square 2: Open Source */}
        <div className="flex flex-col bg-main justify-center p-8 min-h-[220px] border-black">
          <div className="flex items-center mb-4">
            <OpensourceIcon className="mr-4 w-10 h-10 text-black" />
            <span id="open-source" className="text-2xl font-bold text-black">
              Open Source
            </span>
          </div>
          <p className="text-lg text-black">
            Tanto este proyecto como el original son Open Source, asi que cualquiera puede usarlos como prefiera.
          </p>
        </div>
        {/* Square 3: What does this do? */}
        <div className="flex flex-col bg-main-light lg:bg-main justify-center p-8 min-h-[220px] border-t-4 border-black md:border-b-0 md:border-r-4">
          <div className="flex items-center mb-4">
            <FanIcon className="mr-4 w-10 h-10 text-black" fill="black" />
            <span
              id="what-does-this-do"
              className="text-2xl font-bold text-black"
            >
              Para que sirve Toncadiscos?
            </span>
          </div>
          <p className="text-lg text-black">
            Es un proyecto relativamente pequeño para crear "Toncadiscos", colas colaborativas donde varias personas 
            pueden agregar canciones a una cola desde cualquier dispositivo que tenga el link del Toncadisco.
            El creador del Toncadisco puede reproducir, pausar, reorganizar el orden de las canciones y cambiar la
            cancion actual reproduciendose. Los demas usuarios podran agregar canciones.
          </p>
        </div>
        {/* Square 4: Is it fair if I have a large group? */}
        <div className="flex flex-col justify-center p-8 min-h-[220px] border-t-4 bg-main md:bg-main-light">
          <div className="flex items-center mb-4">
            <SpikeIcon className="mr-4 w-10 h-10 text-black" />
            <span
              id="fair-for-large-group"
              className="text-2xl font-bold text-black"
            >
              Que pasa si son una banda de personas?
            </span>
          </div>
          <p className="text-lg text-black">
            Se usa un pequeño sistema de cola justa, si la persona A agrega dos canciones y una persona B  
            agrega una cancion, dicha cancion de B se coloca entre las dos de A. Esto escala infinitamente
            {"(creo jaja)"}
          </p>
        </div>
      </div>
    </div>
  );
}
