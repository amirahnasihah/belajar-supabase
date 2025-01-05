import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Video, Lightbulb, FileText } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  author: string;
  type: "book" | "video" | "tip" | "guide";
  link?: string;
  votes: number;
}

export function ResourceSharing() {
  const resources: Resource[] = [
    {
      id: "1",
      title: "Tajweed Made Easy",
      description: "Comprehensive guide for beginners learning Tajweed rules",
      author: "Ustaz Ahmad",
      type: "book",
      link: "/resources/tajweed-made-easy",
      votes: 125,
    },
    {
      id: "2",
      title: "Nun Sakinah Rules Explained",
      description: "Visual explanation of Izhar, Idgham, Iqlab, and Ikhfa",
      author: "Ustazah Aminah",
      type: "video",
      link: "https://example.com/video",
      votes: 89,
    },
    // Add more resources as needed
  ];

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Resource Hub</CardTitle>
          <CardDescription>
            Discover and share valuable Tajweed learning resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="books">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="books">
                <Book className="mr-2 h-4 w-4" />
                Books
              </TabsTrigger>
              <TabsTrigger value="videos">
                <Video className="mr-2 h-4 w-4" />
                Videos
              </TabsTrigger>
              <TabsTrigger value="tips">
                <Lightbulb className="mr-2 h-4 w-4" />
                Tips
              </TabsTrigger>
              <TabsTrigger value="guides">
                <FileText className="mr-2 h-4 w-4" />
                Guides
              </TabsTrigger>
            </TabsList>

            {["books", "videos", "tips", "guides"].map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid gap-4">
                  {resources
                    .filter(
                      (resource) => resource.type === category.slice(0, -1)
                    )
                    .map((resource) => (
                      <Card key={resource.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">
                                {resource.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {resource.description}
                              </p>
                              <p className="text-sm mt-2">
                                By: {resource.author}
                              </p>
                            </div>
                            <div className="text-center">
                              <span className="block font-bold">
                                {resource.votes}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                votes
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
